const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const issues = require('./issues');

function checkFolder(folderPath) {
    return fs.existsSync(folderPath)
}

function createFolder(newFolderPath) {
    fs.mkdirSync(newFolderPath);
}

function repo (url, folderPath) {
    request(url, (error, req, body) => {
        fetchRepo(body, folderPath);
    });
}

function fetchRepo(html, folderPath) {
    let $ = cheerio.load(html);
    let repoList = $('.f3.color-text-secondary.text-normal.lh-condensed').slice(0, 5);
    for (let i = 0; i < repoList.length; i++) {
        let aTags = $(repoList[i]).find("a");
        let repoName = $(aTags[aTags.length - 1]).text().trim();
        if (checkFolder(repoName)) {
            createFolder (`${folderPath}/${repoName}`);
        }
        // console.log(repoName);
        let link = 'https://github.com' + $(aTags[aTags.length - 1]).attr("href").trim() + '/issues';
        // console.log(link);
        if (!checkFolder(`${folderPath}/${repoName}`)) {
            createFolder(`${folderPath}/${repoName}`);
        }
        issues (link, `${folderPath}/${repoName}`);
    }
}

module.exports = repo;