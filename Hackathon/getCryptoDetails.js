const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = (async (link, tab) => {
    let data = [];
    await tab.goto (link);
    let allTrTags = tab.$$ ('.sc-AxhCb.hLddjF table tbody tr');
    
    let cryptoCaptionTag = await tab.$$('.sc-AxhCb.hLddjF table caption');
    let cryptoCaption = await tab.evaluate ((e)=> e.textContent, cryptoCaptionTag);

    let cryptoPriceInfo = await tab.evaluate ((e)=> e.textContent, allTrTags[0]);
    
    let cryptoPriceChange = await tab.evaluate ((e)=> e.textContent, allTrTags[1]);

    let cryptoLowHigh = await tab.evaluate ((e)=> e.textContent, allTrTags[2]);

    let cryptoTadingVolume = await tab.evaluate ((e)=> e.textContent, allTrTags[3]);

    let cryptoVolByMarketCap = await tab.evaluate ((e)=> e.textContent, allTrTags[4]);

    let cryptoMaketDominance = await tab.evaluate ((e)=> e.textContent, allTrTags[5]);

    let cryptoMarketRank = await tab.evaluate ((e)=> e.textContent, allTrTags[6]);

    let cryptoMarketCap = await tab.evaluate ((e)=> e.textContent, allTrTags[7]);

    let cryptoFullyDilutedMarketCap = await tab.evaluate ((e)=> e.textContent, allTrTags[8]);

    let cryptoYesterdayLowHigh = await tab.evaluate ((e)=> e.textContent, allTrTags[9]);

    let cryptoOpenClose = await tab.evaluate ((e)=> e.textContent, allTrTags[10]);

    let cryptoYesterdayChange = await tab.evaluate ((e)=> e.textContent, allTrTags[11]);

    let cryptoYesterdayVolume = await tab.evaluate ((e)=> e.textContent, allTrTags[12]);

    let cryptoWeekLowHigh = await tab.evaluate ((e)=> e.textContent, allTrTags[13]);

    let cryptoMonthLowHigh = await tab.evaluate ((e)=> e.textContent, allTrTags[14]);

    let cryptoAllTimeNow = await tab.evaluate ((e)=> e.textContent, allTrTags[15]);

    let cryptoBitcoinROI = await tab.evaluate ((e)=> e.textContent, allTrTags[16]);

    let cryptoMaxSupply = await tab.evaluate ((e)=> e.textContent, allTrTags[19]);

    let cryptoInformationPTags = await tab.$$('.sc-AxjAm.gTzmEg.contentOpen___1Knir.hasShadow___jrTed div p');
    let cryptoInformation = (await tab.evaluate ((e)=> e.textContent, InformationPTags[0])) + (await tab.evaluate ((e)=> e.textContent, InformationPTags[1]));
    
});