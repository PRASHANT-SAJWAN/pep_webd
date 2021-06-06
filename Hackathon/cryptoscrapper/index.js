const puppeteer = require('puppeteer');
const fs = require('fs');
const getCryptoDetails = require ('./getCryptoDetails.js');
const getIdeas = require ('./getIdea');
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

    // all name tags
    let allCryptoNameTags = await tab.$$('.sc-AxhCb.bXGzHn a .sc-AxhUy.fqrLrs');
    // all links tags of crypto pages
    let allCryptoDetailPageLinksATag = await tab.$$('.sc-AxhCb.bXGzHn a');

    let allCryptoDetailPageLinks = [];
    let allCryptoName = [];
    let allData = [];

    // taking at max 5 crypto for now !!
    let n = Math.min(5, allCryptoNameTags.length);
    for (let i = 0; i < n; ++i) {
        let cryptoName = await tab.evaluate((e) => e.textContent, allCryptoNameTags[i]);
        let cryptoDetailPageLink = await tab.evaluate((e) => e.getAttribute('href'), allCryptoDetailPageLinksATag[i]);

        let completeLink = homePage + cryptoDetailPageLink;

        allCryptoName.push(cryptoName);
        allCryptoDetailPageLinks.push(completeLink);

        // writing details in a JSON file in seperate folder
        if (!(fs.existsSync(`./${cryptoName}`)))
            fs.mkdirSync(`./${cryptoName}`);
        let details = await getCryptoDetails (completeLink, browser, cryptoName);
        fs.writeFileSync(`./${cryptoName}/data.json`, JSON.stringify(details));
        // also maintaining a complete data JSON file
        allData.push (details);
    }
    fs.writeFileSync(`./data.json`, JSON.stringify(allData));

    /*get crypto news and ideas from another website*/
    await getIdeas (browser, allCryptoName);
    // console.log(" >>> pushed all data !!! ");
    console.log("End !!! ");
    browser.close();
})();