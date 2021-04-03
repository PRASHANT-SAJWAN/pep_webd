const puppeteer = require("puppeteer");
const id = "xacor82723@bsmitao.com";
const pw = "123456789";
let tab;
let idx;
let code;
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    slowMo: 10 // this slows the code
});

browserOpenPromise.then((browser) => {
    // get all pages in browser
    console.log("BROWSER OPENED !!!! ");
    return browser.pages();
}).then((allPages) => {
    tab = allPages[0];
    // first tab in all tabs in browser goes to the given url
    return tab.goto("https://www.hackerrank.com/auth/login");
}).then(() => {
    // typing text (id) in '#input-1' selector
    return tab.type('#input-1', id);
}).then(() => {
    // typing text (pw) in '#input-2' selector
    return tab.type('#input-2', pw);
}).then(() => {
    // wait for selector to load and then click it
    // waitAndClick is our user defined promise
    return waitAndClick('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
}).then(() => {
    return waitAndClick('#base-card-1-link');
}).then(() => {
    return waitAndClick('a[data-attr1="warmup"]');
}).then(() => {
    // waiting for problems to load
    return tab.waitForSelector('.js-track-click.challenge-list-item', { visible: true });
}).then(() => {
    // returning all problems
    return tab.$$('.js-track-click.challenge-list-item');
}).then((allQuestionTags) => {
    // console.log(allQuestionTags);
    // console.log(allQuestionTags.length);
    let allLinksPromise = [];
    for (let i = 0; i < allQuestionTags.length; ++i) {
        let aTag = allQuestionTags[i];
        let linkPromise = tab.evaluate((e) => e.getAttribute('href'), aTag);
        allLinksPromise.push(linkPromise);
    }
    // returns a promise with promise of all the links in list
    return Promise.all(allLinksPromise);
}).then((allLinks) => {
    let completeLinks = allLinks.map((link) => {
        return 'https://www.hackerrank.com' + link;
    });

    // trick to solve all questions one by one
    let oneQuestionSolvePromise = solveQuestion(completeLinks[0]);
    for (let i = 1; i < completeLinks.length; ++i) {
        oneQuestionSolvePromise = oneQuestionSolvePromise.then(function () {
            oneQuestionSolvePromise = solveQuestion(completeLinks[i]);
            return oneQuestionSolvePromise;
        });
    }
    return oneQuestionSolvePromise;
}).then(() => {
    console.log("END !!!");
}).catch((error) => {
    console.log(" ERROR !!! " + error);
})


function waitAndClick(selector) {
    return new Promise((resolve, reject) => {
        tab.waitForSelector(selector, { visible: true }).then(() => {
            return tab.click(selector);
        }).then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}

function handleLockBtn() {
    return new Promise(function (resolve, reject) {
        let waitPromise = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled', { visible: true, timeout: 5000 });
        waitPromise.then(function () {
            let lockBtnPromise = tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
            return lockBtnPromise;
        }).then(function (lockBtn) {
            // console.log(lockBtn);
            let lockBtnClickPromise = lockBtn.click();
            return lockBtnClickPromise;
        }).then(function () {
            // clicked on lock btn
            // lock btn found
            console.log("lock btn found !!!");
            resolve();
        }).catch(function (error) {
            // lock btn not found
            console.log("lock btn not found !!!");
            resolve();
        })
    })
}

function solveQuestion(questionLink) {
    return tab.goto(questionLink).then(() => {
        // click on the 'editorial' tag
        // console.log(questionLink);
        return waitAndClick('div[data-attr2="Editorial"]');
    }).then(() => {
        // wait and click on 'I want to unlock editorial' button
        // let clickEditorialPromise = waitAndClick ('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        return handleLockBtn();
    }).then(() => {
        // waiting for editorial selector to load
        return tab.waitForSelector('.challenge-editorial-block .hackdown-content h3');
    }).then(() => {
        // language h3 -> '.challenge-editorial-block .hackdown-content h3'
        return tab.$$('.challenge-editorial-block .hackdown-content h3');
    }).then(function (allCodeNameElements) {
        let allCodeNamesPromise = [];
        for (let i = 0; i < allCodeNameElements.length; i++) {
            let codeNamePromise = tab.evaluate(function (elem) {
                return elem.textContent;
            }, allCodeNameElements[i]);
            allCodeNamesPromise.push(codeNamePromise);
        }
        return Promise.all(allCodeNamesPromise);
    }).then((allCodeNamesTag) => {
        for (let i = 0; i < allCodeNamesTag.length; ++i) {
            if (allCodeNamesTag[i] == "C++") {
                idx = i;
                break;
            }
        }
        // return codeTag promise
        // code -> '.challenge-editorial-block .hackdown-content .highlight'
        return tab.$$('.challenge-editorial-block .hackdown-content .highlight');
    }).then((allCodes) => {
        let codeDiv = allCodes[idx];
        // cpp Code text promise
        return tab.evaluate((e) => {
            return e.textContent;
        }, codeDiv);
    }).then((cppCode) => {
        code = cppCode;
        // console.log(code);
        // goto problem statement
        return waitAndClick('div[data-attr2="Problem"]');
    }).then(function () {
        console.log('click checkbox');
        return waitAndClick(".custom-input-checkbox");
    }).then(function () {
        return tab.waitForSelector(".custominput");
    }).then(() => {
        // write code on custom input
        return tab.type('.custominput', code);
    }).then(() => {
        return tab.keyboard.down('Control');
    }).then(() => {
        return tab.keyboard.press('a');
    }).then(() => {
        return tab.keyboard.press('x');
    }).then(() => {
        return tab.keyboard.up('Control');
    }).then(() => {
        // click on editor space
        return waitAndClick('.monaco-editor.no-user-select .vs');
    }).then(() => {
        return tab.keyboard.down('Control');
    }).then(() => {
        return tab.keyboard.press('a');
    }).then(() => {
        return tab.keyboard.press('v');
    }).then(() => {
        return tab.keyboard.up('Control');
    }).then(() => {
        // click submit button
        return tab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
    }).catch((error) => {
        console.log("Get Code Error !!  " + error);
    })
}