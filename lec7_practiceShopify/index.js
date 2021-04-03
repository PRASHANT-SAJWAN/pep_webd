const cheerio = require ('cheerio');
const request = require ('request');
const getSites = require ('./getSites');

const url = 'https://onshopify.com'
const caurl = 'https://onshopify.com/domain-zone/ca';

request (caurl, (req, res, html) => {
    let $ = cheerio.load(html);
    let pageList = $('.container.mtb .row li a');
    let firstPageTag = pageList[0];
    let lastPageTag = pageList[pageList.length - 1];
    let lastPage = $(lastPageTag).attr('href').split('/');
    lastPage = Number(lastPage[lastPage.length - 1]);
    // console.log($(page1).attr('href'));
    // console.log($(pageLast).attr('href'));

    for (let page = 1; page <= lastPage; ++page) {
        let newUrl = `${url}${$(firstPageTag).attr('href')}${(page > 1? page : '')}`;
        console.log(newUrl);
        getSites(newUrl);
    }
});