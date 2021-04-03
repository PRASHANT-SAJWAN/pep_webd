const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function issues (url, folderPath) {
    request(url, (error, req, body) => {
        fetchIssues (body, folderPath);
    });
}

function fetchIssues (html, folderPath) {
    let $ = cheerio.load(html);
    let issuesTag = $('.flex-auto.min-width-0.p-2.pr-3.pr-md-2').slice(0, 5);
    let issuesObj = {};
    // console.log(issuesTag.length);
    for (let i = 0; i < issuesTag.length; ++i) {
        let issueTag = $(issuesTag[i]);
        let issueName = $(issueTag.find("a")['0']).text().trim();
        let issueUrl = 'https://github.com' + $(issueTag.find("a")['0']).attr('href').trim();
        console.log(issueName + " : " + issueUrl);
        issuesObj[issueName] = issueUrl;
    }
    fs.writeFileSync (`${folderPath}/issues.json`, JSON.stringify(issuesObj));
    // console.log(issuesObj);
}

module.exports = issues;