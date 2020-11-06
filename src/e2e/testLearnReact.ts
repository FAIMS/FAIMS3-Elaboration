let wd = require('wd');
let assert = require('assert');
let asserters = wd.asserters;
let environment = require('./environment.ts');

// For browserstack
const desiredCaps = {
    // Set your BrowserStack access credentials
    'browserstack.user': environment.browserstack.user,
    'browserstack.key': environment.browserstack.key,
    'browserstack.appium_version': '1.6.5',

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
const driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

// For local testing with emulator, replace the above with below:
// const desiredCaps = {
//     platformName: 'Android',
//     platformVersion: '11.0',
//     deviceName: 'Android Emulator',
//     // path to apk file
//     app: 'C:\\Users\\ang05a\\Downloads\\app-debug.apk',
//     automationName: 'Appium'
// };
// const driver = wd.promiseRemote("http://localhost:4723/wd/hub");

driver
    .init(desiredCaps)
    .then(async () => {
        return await driver.waitForElementByAccessibilityId(
            'Learn React', asserters.isDisplayed
        && asserters.isEnabled, 30000);
    })
    .then(async (learnReact: { click: () => any; }) => {
        await learnReact.click();
    })
    .then(async () => {
        let prompts = await driver.elements('xpath', "//*[@text='Chrome']");
        if (prompts.length > 0) {
            // click twice if prompted to open chrome
            // otherwise it will open with a default browser
            let chrome = prompts[0];
            await chrome.click();
            await chrome.click();
        }
    })
    .fin(function () {
        return driver.quit();
    })
    .done();