const request = require ('request');
const cheerio = require ('cheerio');

let getAllMatches = (url) => {
    request (url, (error, req, body) => {
        if (error)
            return console.log(error);
        let $ = cheerio.load(body);
        let allTags = $('.match-info-link-FIXTURES');
        for (let i = 0; i < allTags.length; ++i) {
            let aTag = $(allTags[i+""]).attr("href");
            console.log (aTag);
        }
    });
}

module.exports = getAllMatches;
