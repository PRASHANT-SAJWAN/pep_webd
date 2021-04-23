const request = require('request');
const cheerio = require('cheerio');

let url1 = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary';
let url2 = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard';
let getFirstCommentary = (error, response, body) => {
    if (error)
        return console.log(error);
    let ch = cheerio.load(body);
    let commentary = ch('div[class="match-comment-long-text"]');
    console.log(ch(commentary['0']).text());
}

console.log("Last Over Commentary => ");
request (url1, getFirstCommentary);


getBestBowlerInfo = (error, req, body) => {
    if (error)
        return console.log(error);
    let $ = cheerio.load(body);
    let table = $('.table.bowler');
    let detailsOfBowler = undefined;
    let wickets = 0;
    for (let i = 0; i < table.length; ++i) {
        let team1Bowlers = $(table[i]).find("tr");
        // console.log(team1Bowlers.length);

        for (let i = 1; i < team1Bowlers.length; ++i) {
            let W = $($(team1Bowlers[i]).find("td")[4]).text();
            // console.log(W);
            if (W > wickets) {
                wickets = W;
                detailsOfBowler = $(team1Bowlers[i]).find("td");
            }
        }
    }
    let tableHead = $($($('.thead-light.bg-light')[2]).find("tr")).find("th");

    for (let i = 0; i < 7; ++i) {
        console.log(`${$(tableHead[i]).text()} : ${$(detailsOfBowler[i]).text()} \n`);
    }
}

console.log("\nBowler with most Wicket =>");
request(url2, getBestBowlerInfo);

// 