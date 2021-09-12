const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let repo = require('./repo');

const url = 'https://github.com/topics';

function checkFolder(folderPath) {
    return fs.existsSync(folderPath)
}

function createFolder(newFolderPath) {
    fs.mkdirSync(newFolderPath);
}

request(url, (error, req, body) => {
    createTopics(body);
});

function createTopics(html) {
    let $ = cheerio.load(html);
    let TopicsList = $('.no-underline.d-flex.flex-column.flex-justify-center');
    for (let i = 0; i < TopicsList.length; i++) {
        let pTag = $(TopicsList[i]).find('p')['0'];
        let TopicName = $(pTag).text().trim();
        let repoUrl = 'https://github.com' + $(TopicsList[i]).attr("href").trim();
        // console.log(repoUrl + " " + TopicName);
        if (!checkFolder(TopicName)) {
            createFolder('./' + TopicName);
        }
        repo(repoUrl, `./${TopicName}`);
    }
}