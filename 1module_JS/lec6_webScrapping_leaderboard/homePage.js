const request = require ('request');
const cheerio = require ('cheerio');
let getAllMatches = require ('./allMatches');

let url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595';

request (url, (error, req, html) => {
    if (error)
        return console.log(error);
    let $ = cheerio.load(html);

    let aTag = $('.widget-items.cta-link a');
    let link = $(aTag['0']).attr("href");
    let completeLink = 'https://www.espncricinfo.com' + link;
    // console.log(completeLink);
    getAllMatches (completeLink);
});