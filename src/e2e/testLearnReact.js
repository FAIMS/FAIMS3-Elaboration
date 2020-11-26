var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;
var environment = require('./environment.ts');
// For browserstack
var desiredCaps = {
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
var driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");
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
    .then(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, driver.waitForElementByAccessibilityId('Learn React', asserters.isDisplayed
                    && asserters.isEnabled, 30000)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); })
    .then(function (learnReact) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, learnReact.click()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .then(function () { return __awaiter(_this, void 0, void 0, function () {
    var prompts, chrome;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, driver.elements('xpath', "//*[@text='Chrome']")];
            case 1:
                prompts = _a.sent();
                if (!(prompts.length > 0)) return [3 /*break*/, 4];
                chrome = prompts[0];
                return [4 /*yield*/, chrome.click()];
            case 2:
                _a.sent();
                return [4 /*yield*/, chrome.click()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); })
    .fin(function () {
    return driver.quit();
})
    .done();
