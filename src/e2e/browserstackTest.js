const wd = require('wd');
const assert = require('assert');
const asserters = wd.asserters;

const desiredCaps = {
    // Set your BrowserStack access credentials
    // RTFM!!! https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#using-encrypted-secrets-in-a-workflow
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,

    "browserstack.local" : "true",
    "browserstack.localIdentifier" : process.env.BROWSERSTACK_LOCAL_IDENTIFIER,

    // Set URL of the application under test
    // https://www.browserstack.com/docs/app-automate/appium/upload-app-define-custom-id
    'app': 'ElaborationApp',

    // Specify device and os_version for testing
    'device': 'Google Pixel 3',
    'os_version': '9.0',
    // 'browserstack.appium_version': '1.6.5',
    // 'appium_version': '1.6.5',
    // Set other BrowserStack capabilities
    // You need to invoke the browserstack/github-actions/setup-env@master GitHub Action also in the job where test scripts will run because this Action sets up the environment variables BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_BUILD_NAME and BROWSERSTACK_PROJECT_NAME, which are to be used in your test scripts

    'project': 'FAIMS Main Elaboration',
    'build': process.env.BUILD,
    'name': process.env.GITHUB_COMMIT_MESSAGE,
    'debug': true,
    'browserstack.networkLog': true,
    'browserstack.debug': true
};

// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above

//https://stackoverflow.com/questions/15361189/how-to-select-all-other-values-in-an-array-except-the-ith-element


console.log(desiredCaps)

const driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
    .init(desiredCaps)
    .then(async () => {
        return await driver.waitForElementByAccessibilityId(
            'Learn React', asserters.isDisplayed
        && asserters.isEnabled, 30000)
    })
    .then(async (learnReact: { click: () => any; }) => {
        await learnReact.click()
    })
    .then(async () => {
        let prompts = await driver.elements('xpath', "//*[@text='Chrome']")
        if (prompts.length > 0) {
            // click twice if prompted to open chrome
            // otherwise it will open with a default browser
            let chrome = prompts[0]
            await chrome.click()
            await chrome.click()
        }
    })
    .fin(function () {
        return driver.quit()
    })
    .done()