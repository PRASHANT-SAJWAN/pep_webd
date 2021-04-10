const puppeteer = require('puppeteer');
const fs = require('fs');
const getCryptoDetails = require ('./getCryptoDetails.js');

const homePage = 'https://coinmarketcap.com';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        headless: true,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    // const tab = await browser.newPage();
    const pages = await browser.pages();
    let tab = pages[0];

    await tab.goto(homePage);

    let allCryptoNameTags = await tab.$$('.sc-AxhCb.bXGzHn a .sc-AxhUy.fqrLrs');
    let allCryptoDetailPageLinksATag = await tab.$$('.sc-AxhCb.bXGzHn a');

    let allCryptoDetailPageLinks = [];
    let allCryptoName = [];
    let data = [];

    for (let i = 0; i < 1; ++i) {
        let cryptoName = await tab.evaluate((e) => e.textContent, allCryptoNameTags[i]);
        let cryptoDetailPageLink = await tab.evaluate((e) => e.getAttribute('href'), allCryptoDetailPageLinksATag[i]);

        let completeLink = homePage + cryptoDetailPageLink;

        allCryptoName.push(cryptoName);
        allCryptoDetailPageLinks.push(completeLink);

        // await getCryptoDetails (completeLink, tab);
        let details = await getCryptoDetails (completeLink, tab);
        data.push (details);
    }
    
    // console.log(data);
    // await fs.writeFileSync("./data.json", JSON.stringify(data));
    // console.log("pushed in file !!! ");
    console.log("End !!! ");
    browser.close();
})();