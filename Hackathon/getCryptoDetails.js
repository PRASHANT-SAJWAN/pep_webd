const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = (async (link, tab) => {
    await tab.goto(link);
    let allTrTags = await tab.$$('.sc-AxhCb.hLddjF table tbody tr');

    let cryptoNameTag = await tab.$('.sc-fzqBZW.bQqdJy.h1___3QSYG');
    let cryptoName = await tab.evaluate((e) => e.textContent, cryptoNameTag);

    let cryptoCurrentPriceInfo = await tab.evaluate((e) => e.textContent, allTrTags[0]);

    let cryptoPriceChange = await tab.evaluate((e) => e.textContent, allTrTags[1]);

    let cryptoLowHigh = await tab.evaluate((e) => e.textContent, allTrTags[2]);

    let cryptoTadingVolume = await tab.evaluate((e) => e.textContent, allTrTags[3]);

    let cryptoVolByMarketCap = await tab.evaluate((e) => e.textContent, allTrTags[4]);

    let cryptoMarketDominance = await tab.evaluate((e) => e.textContent, allTrTags[5]);

    let cryptoMarketRank = await tab.evaluate((e) => e.textContent, allTrTags[6]);

    let cryptoMarketCap = await tab.evaluate((e) => e.textContent, allTrTags[7]);

    let cryptoFullyDilutedMarketCap = await tab.evaluate((e) => e.textContent, allTrTags[8]);

    let cryptoYesterdayLowHigh = await tab.evaluate((e) => e.textContent, allTrTags[9]);

    let cryptoOpenClose = await tab.evaluate((e) => e.textContent, allTrTags[10]);

    let cryptoYesterdayChange = await tab.evaluate((e) => e.textContent, allTrTags[11]);

    let cryptoYesterdayVolume = await tab.evaluate((e) => e.textContent, allTrTags[12]);

    let cryptoWeekLowHigh = await tab.evaluate((e) => e.textContent, allTrTags[13]);

    let cryptoMonthLowHigh = await tab.evaluate((e) => e.textContent, allTrTags[17]);

    let cryptoAllTimeLow = await tab.evaluate((e) => e.textContent, allTrTags[18]);

    let cryptoBitcoinROI = await tab.evaluate((e) => e.textContent, allTrTags[19]);

    let cryptoCirculatingSupply = await tab.evaluate((e) => e.textContent, allTrTags[20]);

    let cryptoTotalSupply = await tab.evaluate((e) => e.textContent, allTrTags[21]);

    let cryptoMaxSupply = await tab.evaluate((e) => e.textContent, allTrTags[22]);

    let cryptoInformationPTags = await tab.$$('.about___1OuKY div p');
    let cryptoInformation1 = await tab.evaluate((e) => e.textContent, cryptoInformationPTags[0]);
    let cryptoInformation2 = await tab.evaluate((e) => e.textContent, cryptoInformationPTags[1]);
    let cryptoCompleteInformation = cryptoInformation1.concat('\n\t');
    cryptoCompleteInformation = cryptoCompleteInformation.concat(cryptoInformation2)
    console.log(cryptoCompleteInformation);

    let obj = {
        'price': cryptoCurrentPriceInfo,
        'precentage change': cryptoPriceChange,
        'low / high': cryptoLowHigh,
        'trading volume': cryptoTadingVolume,
        'volume by market capacity': cryptoVolByMarketCap,
        'market dominance': cryptoMarketDominance,
        'market rank': cryptoMarketRank,
        'market capacity': cryptoMarketCap,
        'fully diluted market capacity': cryptoFullyDilutedMarketCap,
        'yesterday low / high': cryptoYesterdayLowHigh,
        'open / close': cryptoOpenClose,
        'yesterday change': cryptoYesterdayChange,
        'yesterday volume': cryptoYesterdayVolume,
        'week low / high': cryptoWeekLowHigh,
        'month low / high': cryptoMonthLowHigh,
        'all time low': cryptoAllTimeLow,
        'bitcoinROI': cryptoBitcoinROI,
        'circulating supply': cryptoCirculatingSupply,
        'total supply': cryptoTotalSupply,
        'max supply': cryptoMaxSupply,
        'about': cryptoCompleteInformation
    };
    return { [cryptoName]: obj };
});