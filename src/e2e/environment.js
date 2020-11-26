var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;

// switch to true for local testing
var local = false;

const androidCaps = {
    // Set your BrowserStack access credentials
    // RTFM!!! https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#using-encrypted-secrets-in-a-workflow
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    "browserstack.local": "true",
    "browserstack.localIdentifier": process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
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
    'browserstack.debug': true,
    // Hybrid app setting to switch to web view automatically
    'autoWebView': true
};
// Rini's local testing config for Android
const localCaps = {
    platformName: 'Android',
    platformVersion: '11.0',
    deviceName: 'Android Emulator',
    // path to apk file
    app: 'C:\\Users\\ang05a\\Documents\\GitHub\\FAIMS3-Elaboration\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk',
    automationName: 'UiAutomator2',
    // Hybrid app setting to switch to web view automatically
    autoWebView: true
};

const driver = local ? wd.promiseRemote("http://localhost:4723/wd/hub") : wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");
const desiredCaps = local ? localCaps : androidCaps;
// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above
//https://stackoverflow.com/questions/15361189/how-to-select-all-other-values-in-an-array-except-the-ith-element
console.log(desiredCaps);

module.exports = {
   wd, assert, asserters,
   driver, desiredCaps
};