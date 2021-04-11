const fs = require('fs');
let link = 'https://in.tradingview.com';

async function getIdeaForOneCrypto (tab, cryptoName) {
    let allIdeasATags = await tab.$$('.tv-widget-idea__title.apply-overflow-tooltip.js-widget-idea__popup');
    let data = [];
    for (let i = 0; i < allIdeasATags.length; ++i) {
        let ideaTitle = await tab.evaluate ((e)=> e.textContent, allIdeasATags[i]);
        let ideaLink = await tab.evaluate ((e)=> e.getAttribute('href'), allIdeasATags[i]);

        data.push ({[ideaTitle] : `${link}${ideaLink}`});
    }
    return {[cryptoName]: data};
}

module.exports = (async (browser, allCryptoNames) => {
    let tab = await browser.newPage();
    await tab.goto(link);

    let allData = [];
    // goto each crypto in list and fetch the ideas obj -> {title : url}
    for (let i = 0; i < allCryptoNames.length; ++i) {
        let newTab = await browser.newPage();
        await newTab.goto(`${link}/ideas/search/${allCryptoNames[i]}`);

        // get idea obj for i(th) crypto...
        let data = await getIdeaForOneCrypto (newTab, allCryptoNames[i]);
        
        fs.writeFileSync(`./${allCryptoNames[i]}/idea.json`, JSON.stringify(data));
        allData.push (data);
        newTab.close();
    }
});