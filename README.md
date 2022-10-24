# Twitter Mass Click And Save

![A screenshot of the script, containing an input box and a button saying "Save Images"](https://i.imgur.com/wjGnfCe.png)

This userscript uses the [Click'N'Save](https://github.com/AlttiRi/twitter-click-and-save) script made by AlttiRi. The Click'N'Save script lets you save any piece of media by pressing a button that appears over it. This script simply detects each button on every image or video, and presses each one as it scrolls down.

The original script keeps track of download history, this extenstion utilizes that so it won't accidentally save images twice in a row. This also means it won't save the same image twice unless you clear the history in LocalStorage. See Click'N'Save's [README](https://github.com/AlttiRi/twitter-click-and-save/blob/master/README.md#twitter-clicknsave) for more information. 

## Installation

1. Install a userscript manager, such as [Tampermonkey](https://www.tampermonkey.net) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
2. Download it here from greasyfork, and confirm.

## Usage

Simply just type the amount of images you want in, and press the save button! As of now, I would recommend putting the number over a few you want, due to it a bug with saving video thumbnails.
