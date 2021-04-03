const puppeteer = require("puppeteer");
const { del } = require("request");
const challanges = require("./challanges");
const challangesData = require('./challanges');
const id = "xacor82723@bsmitao.com";
const pw = "123456789";
let tab;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    const pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type('#input-1', id); // enter ID
    await tab.type('#input-2', pw); // enter Password

    await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');   // click login
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', { visible: true });    // wait for profile dropdown selector

    await tab.click('div[data-analytics="NavBarProfileDropDown"]', { delay: 500 });    // click profile dropdown 
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]', { visible: true }); // wait for administration btn

    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');   // click administration btn
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a', { visible: true });   // wait for nav

    let ChallangeATag = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    await ChallangeATag[1].click()   // click 'Manage Challanges'

    await tab.waitForSelector('.btn.btn-green.backbone.pull-right', { visible: true }); // wait for 'Create Contest' btn
    let createChallengeBtn = await tab.$('.btn.btn-green.backbone.pull-right');
    let createChallangeLink = await tab.evaluate((e) => e.getAttribute('href'), createChallengeBtn);
    createChallangeLink = 'https://www.hackerrank.com' + createChallangeLink;

    // for (let i = 0; i < challangesData.length; ++i) {
        // await addChallange(challangesData[i], browser, createChallangeLink);
    // }

    let challangeTags = await tab.$$('.backbone.block-center');
    let allChallangeLinks = await tab.evaluate ((e)=> e.getAttribute('href'), challangeTags);

    for (let i = 0; i < allChallangeLinks.length; ++i) {
        await addModerator(allChallangeLinks[i], browser, createChallangeLink);
    }
})();


async function addChallange(challenge, browser, createChallangeLink) {
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let probStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    let newTab = await browser.newPage();
    await newTab.goto(createChallangeLink);
    await newTab.waitForSelector('#name', { visible: true });
    await newTab.type('#name', challengeName);
    await newTab.type('#preview', description);
    await newTab.type('#problem_statement-container .CodeMirror textarea', probStatement);
    await newTab.type('#input_format-container .CodeMirror textarea', inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea', constraints);
    await newTab.type('#output_format-container .CodeMirror textarea', outputFormat);
    await newTab.type('#tags_tag', tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green', { delay: 500 });
    await newTab.waitForTimeout(3000);
    await newTab.close();
}

async function addModerator(challangeLink, browser, moderatorName) {
    let newTab = browser.newPage();
    await newTab.goto(challangeLink);

    await newTab.waitForSelector('[data-tab="moderators"]');
    await newTab.click('[data-tab="moderators"]', { delay: 500 });

    await newTab.waitForSelector('#moderator');
    await newTab.click('#moderator', { delay: 500 });

    await newTab.type('#moderator', moderatorName);

    await newTab.click('.btn.moderator-save', { delay: 500 });

    await newTab.click('.save-challenge.btn.btn-green', { delay: 500 });
    await newTab.waitForTimeout(2000);
}