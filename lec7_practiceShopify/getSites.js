const cheerio = require ('cheerio');
const request = require ('request');

function getSite (url) {
    request (url, (req, res, html) => {
        // site name
        // .container.mtb .row .col-lg-12 .col-lg-4.col-md-4.col-sm-12 a button
        let $ = cheerio.load(html);
        let siteNamesList = $('.container.mtb .row .col-lg-12 .col-lg-4.col-md-4.col-sm-12 a button');
        for (let i = 0; i < siteNamesList.length; ++i) {
            let site = $(siteNamesList[i]).text();
            console.log(site);
        }
    });
}

module.exports = getSite;