// ==UserScript==
// @name         Download Timeline Posts
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  presses the save button from click and save on each post on a timeline
// @match        https://twitter.com/*
// @homepageURL  https://github.com/BlueRedBlueYellow/twitter-mass-click-n-save/
// @supportURL   https://github.com/BlueRedBlueYellow/twitter-mass-click-n-save/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==
const scrollLength = 400;
const scrollDelay = 50;
const cssHeadStylesheet = `
#save-images-bar {
    color: black;
    font-family: 'TwitterChirp';
    font-size: 16px;
}

#image-amount-label {
    margin: 8px;
    padding: 4px;
    color: white;
}

#image-amount-input {
    width: 40px;
    height: 30px;
}

#save-images-btn {
    width: 50px;
    height: 30px;
    margin: 8px;
    padding: 4px;

    background-color: white;
    font-weight: 700;
    font-size: 14px;

    border-radius: 20px;
    border: none;
    cursor: pointer;
}

#save-images-btn:hover {
    background-color: lightgray;
}
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = cssHeadStylesheet;
const timer = ms => new Promise(res => setTimeout(res, ms));

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) return resolve(document.querySelector(selector));

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function searchForImages(imageAmount) {
    let imagesClicked = 0;
    let clickNSaveButtons = document.getElementsByClassName("ujs-btn-download ujs-not-downloaded");
    while (true) {
        console.log(clickNSaveButtons)
        await timer(scrollDelay);
        window.scrollBy(0, scrollLength);
        for (let button of clickNSaveButtons) {
            if (imagesClicked > imageAmount) {
                return true;
            } else if (button.className === "ujs-btn-download ujs-not-downloaded" || button.className === "ujs-btn-download ujs-not-downloaded ujs-video") {
                button.click();
                imagesClicked += 1;
            };
        };
    };
};

async function main() {
    const saveImagesBar = document.createElement("div");
    saveImagesBar.id = "save-images-bar";

    const imageAmountInput = document.createElement("input");
    imageAmountInput.id = "image-amount-input";
    imageAmountInput.type = "number";

    const imageAmountLabel = document.createElement("label");
    imageAmountLabel.id = "image-amount-label";
    imageAmountLabel.innerText = "Image Amount:";

    const getImagesBtn = document.createElement("button");
    getImagesBtn.id = "save-images-btn";
    getImagesBtn.innerHTML = "Save";
    getImagesBtn.onclick = async function() {
        let imageAmount = parseInt(imageAmountInput.value);
        imageAmount = imageAmount ? imageAmount : 0;
        searchForImages(imageAmount);
    };

    const navBar = await waitForElement(".css-1dbjc4n.r-1pi2tsx.r-1wtj0ep.r-1rnoaur.r-1e081e0.r-o96wvk .css-1dbjc4n.r-1habvwh");
    navBar.appendChild(saveImagesBar);
    saveImagesBar.appendChild(imageAmountLabel);
    saveImagesBar.appendChild(imageAmountInput);
    saveImagesBar.appendChild(getImagesBtn);

    document.head.insertAdjacentElement('beforeend', styleTag);
};

main();
