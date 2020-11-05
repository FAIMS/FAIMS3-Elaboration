let wd = require('wd');
let assert = require('assert');
let asserters = wd.asserters;
let environment = require('./environment.js');

desiredCaps = {
    // Set your BrowserStack access credentials
    'browserstack.user': environment.browserstack.user,
    'browserstack.key': environment.browserstack.key,

    // Set URL of the application under test
    'app': environment.browserstack.appUrl,

    // Specify device and os_version for testing
    'device': 'Google Pixel 3',
    'os_version': '9.0',

    // Set other BrowserStack capabilities
    'project': 'First NodeJS project',
    'build': 'Node Android',
    'name': 'first_test'
};

// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
    .init(desiredCaps)
    .then(function () {
        return driver.waitForElementByAccessibilityId(
            'Learn React', asserters.isDisplayed
        && asserters.isEnabled, 30000);
    })
    .then(function (learnReact) {
        return learnReact.click();
    })
    .then(function () {
        return driver.element('xpath', ("//*[@text='Chrome']"));
    })
    .then(function (chrome) {
        chrome.click();
        return chrome.click();
    })
    .then(function () {
        driver.setImplicitWaitTimeout(10000);
        return assert.notStrictEqual(driver.url(), 'reactjs.org');
    })
    .fin(function () {
        return driver.quit();
    })
    .done();
