const puppeteer = require('puppeteer');
const fs = require('fs');
const getCryptoDetails = require ('./getCryptoDetails.js');

const homePage = 'https://coinmarketcap.com';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    const pages = await browser.pages();
    let tab = pages[0];

    await tab.goto(homePage);

    let allCryptoNameTags = await tab.$$('.sc-AxhCb.bXGzHn a .sc-AxhUy.fqrLrs');
    let allCryptoDetailPageLinksATag = await tab.$$('.sc-AxhCb.bXGzHn a');

    let allCryptoDetailPageLinks = [];
    let allCryptoName = [];

    let n = Math.min(5, allCryptoNameTags.length);
    for (let i = 0; i < n; ++i) {
        let cryptoName = await tab.evaluate((e) => e.textContent, allCryptoNameTags[i]);
        let cryptoDetailPageLink = await tab.evaluate((e) => e.getAttribute('href'), allCryptoDetailPageLinksATag[i]);

        let completeLink = homePage + cryptoDetailPageLink;

        allCryptoName.push(cryptoName);
        allCryptoDetailPageLinks.push(completeLink);

        // await getCryptoDetails (completeLink, tab);
        if (!(fs.existsSync(`./${cryptoName}`)))
            fs.mkdirSync(`./${cryptoName}`);
        let details = await getCryptoDetails (completeLink, browser, cryptoName);
        fs.writeFileSync(`./${cryptoName}/data.json`, JSON.stringify(details));
        // console.log("pushed in file !!! ");
    }
    // console.log(" >>> pushed all data !!! ");
    // console.log("End !!! ");
    browser.close();
})();