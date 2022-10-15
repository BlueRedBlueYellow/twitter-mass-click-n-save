// ==UserScript==
// @name         Download Timeline Posts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  presses the save button from click and save on each post on a timeline
// @author       You
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==
const timer = ms => new Promise(res => setTimeout(res, ms))
async function searchForImages(imageAmount) {
    var imagesClicked = 0;
    while (true) {
        let clickNSaveButtons = document.getElementsByClassName("ujs-btn-download ujs-not-downloaded");
        console.log(clickNSaveButtons)
        await timer(150);
        window.scrollBy(0, 400);
        for (let button of clickNSaveButtons) {
            if (imagesClicked > imageAmount) {
                return true;
            } else if (button.className === "ujs-btn-download ujs-not-downloaded" || button.className === "ujs-btn-download ujs-not-downloaded ujs-video") {
                button.click();
                imagesClicked += 1;
                console.log(imagesClicked);
                await timer(150);
            };
        };
    };
};
setTimeout(() => {
    const followersBar = document.getElementsByClassName("css-1dbjc4n r-13awgt0 r-18u37iz r-1w6e6rj")[0];
    console.log(followersBar)

    const getImagesBtn = document.createElement("button");
    getImagesBtn.innerHTML = "save images";
    getImagesBtn.className = "save-images";
    getImagesBtn.style = "margin: 8px; padding: 4px;";

    const imagesAmountInput = document.createElement("input");
    imagesAmountInput.type = "number";
    imagesAmountInput.style = "width: 70px;";
    imagesAmountInput.className = "page-input";

    const imageAmountLabel = document.createElement("label");
    imageAmountLabel.innerText = "Image amount?:"
    imageAmountLabel.style = "color: white; margin: 8px; padding: 4px; font-family: 'Arial';"

    followersBar.appendChild(imageAmountLabel);
    followersBar.appendChild(imagesAmountInput);
    followersBar.appendChild(getImagesBtn);

    getImagesBtn.onclick = async function() {
        const imageAmount = imagesAmountInput.value;
        var imagesClicked = 0;
        console.log("scrolled");
        await timer(1000);
        await searchForImages(imageAmount);
    };
}, 2000)

