const request = require('request');
const cheerio = require('cheerio');

let url = 'https://www.espncricinfo.com/series/england-tour-of-india-2020-21-1243364/india-vs-england-1st-t20i-1243388/full-scorecard';

request(url, (error, req, body) => {
    if (error)
        return console.log(error);
    let $ = cheerio.load(body);
    let bothInnings = $('.Collapsible');

    let matchData = {};
    for (let i = 0; i < bothInnings.length; i++) {
        let inning = $(bothInnings[i + ""]).find("h5");
        let teamName = $(inning).text().split('INNINGS')[0];
        let teamInfo = $($(bothInnings[i + ""]).find(".table.batsman")).find("tr");
        let teamData = {};
        for (let j = 1; j < teamInfo.length - 4; j += 2) {
            let batsmanInfo = $(teamInfo[j + ""]).find("td");
            let batsmanName = $(batsmanInfo[0]).text();
            teamData[batsmanName] = {
                'R': $(batsmanInfo[2]).text(),
                'B': $(batsmanInfo[3]).text(),
                'M': $(batsmanInfo[4]).text(),
                'fourS': $(batsmanInfo[5]).text(),
                'sixS': $(batsmanInfo[6]).text(),
                'SR': $(batsmanInfo[7]).text()
            }
        }
        matchData[teamName] = teamData;
    }
    console.log(matchData);
});
