const puppeteer = require("puppeteer");
const id = "xacor82723@bsmitao.com";
const pw = "123456789";
let tab;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        // slowMo: 10 // this slows the code
    });
    const pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type('#input-1', id); // enter ID
    await tab.type('#input-2', pw); // enter Password
    await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');   // click login
    await tab.waitForSelector ('.mmR.profile-username');    // wait for profile dropdown selector
    await tab.click ('.mmR.profile-username');    // click profile dropdown
    await tab.waitForSelector('.dropdown-menu.drop-list.pull-right a[href="/administration"]'); // wait for administration btn
    await tab.click('.dropdown-menu.drop-list.pull-right a[href="/administration"]');   // click administration btn
})();