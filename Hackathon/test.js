
const puppeteer = require('puppeteer');
// const fs = require('fs');
// const getCryptoDetails = require ('./getCryptoDetails.js');

const link = 'https://coinmarketcap.com/currencies/bitcoin/';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    const pages = await browser.pages();
    let tab = pages[0];

    await tab.goto(link);
    /* testing ss */
    await tab.waitForSelector('.chart___3dWkY');
    const logo = await tab.$('.chart___3dWkY');
    await logo.screenshot({
        path: `${cryptoName}/last_week.png`
    });
})();