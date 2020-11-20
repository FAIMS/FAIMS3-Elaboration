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
    'name': 'observation_form_test'
}; 
const driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

// For local testing with emulator, replace the above with below:
// const desiredCaps = {
//     platformName: 'Android',
//     platformVersion: '11.0',
//     deviceName: 'Android Emulator',
//     // path to apk file
//     app: 'C:\\Users\\ang05a\\Documents\\GitHub\\FAIMS3-Elaboration\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk',
//     autoWebView: 'true',
//     automationName: 'appium'
//     // chromedriverUseSystemExecutable: 'true'
//     // chromedriverExecutable: 'C:\\Users\\ang05a\\AppData\\Roaming\\npm\\node_modules\\appium\\node_modules\\appium-chromedriver\\chromedriver\\win\\83\\chromedriver.exe'
// };

// const driver = wd.promiseRemote("http://localhost:4723/wd/hub");

// Values for the form
const formValues = {
    optional: {
        temperature: '30',
        wind: 'medium'
    },
    mandatory: {
        location: '133, -17',
        time: '12:00',
        weather: 'fine',
        treeHeight: 10,
        treeGirth: 0.8,
        leafSize: 'small',
        leafShape: 'rounded',
        barkColour: 'silver',
        barkTexture: 'smooth'
    }
};

driver
    .init(desiredCaps)
    .then(async () => {
        /** First form:
         * =============
         * Fill out only location
         * Expected: 
         * Form validation error
         */
        let location = await driver.waitForElement('xpath',
            "//*[@text='Observation Location*']/../android.widget.EditText", 5000);
        await location.type(formValues.mandatory.location);
        // submit form
        let next = await driver.element('xpath', "//*[@text='Next']");
        await next.click();

        // check validation error
        let errorMsg = await driver.element('id', 'android:id/message');
        assert.equal(await errorMsg.text(), "please fix form errors");
        // press OK
        let okButton = await driver.element('id', 'android:id/button1');
        await okButton.click();
    })
    .then(async () => {
        // First form:
        // Fill out all mandatory fields, but not the optional ones
        // Expected: 
        // no error   
        let date = await driver.waitForElement('xpath', "//*[@text='Observation Date*']/../android.widget.Spinner", 5000);
        date.click();
        // just select today's date
        let datePicker = await driver.waitForElement('id', 'android:id/button1', 3000);
        await datePicker.click();

        let time = await driver.element('xpath', "//*[@text='Observation Time*']/../android.widget.Spinner");
        await time.click();
        // click on 12 hour
        let timePicker = await driver.waitForElements('class name',
            'android.widget.RadialTimePickerView$RadialPickerTouchHelper', 3000);
        await timePicker[11].click();
        // click on 00 minutes
        timePicker = await driver.waitForElements('class name',
            'android.widget.RadialTimePickerView$RadialPickerTouchHelper', 3000);
        await timePicker[0].click();
        // click on PM
        let pm = await driver.element('id', 'android:id/pm_label');
        await pm.click();
        // click on SET
        let set = await driver.element('id', 'android:id/button1');
        await set.click();

        let weather = await driver.waitForElement('xpath', "//*[@text='Weather*']/../android.widget.Spinner", 3000);
        weather.click();
        // click on fine
        let selection = await driver.waitForElements('class name', 'android.widget.CheckedTextView', 3000);
        await selection[1].click();
        // submit form
        let next = await driver.element('xpath', "//*[@text='Next']");
        await next.click();
    })
    .then(async () => {
        // Second form:
        // Fill out only some mandatory fields
        // Expected:
        // Form validation error
        let leafSize = await driver.waitForElement('xpath',
            "//*[@text='Leaf Size*']/../android.widget.Spinner", 5000);
        await leafSize.click();
        let sizes = await driver.waitForElements('class name', 'android.widget.CheckedTextView', 3000);
        await sizes[1].click();

        let leafShape = await driver.waitForElement('xpath', "//*[@text='Leaf Shape*']/../android.widget.Spinner", 3000);
        await leafShape.click();
        let shapes = await driver.waitForElements('class name', 'android.widget.CheckedTextView', 3000);
        await shapes[1].click();

        let barkColour = await driver.waitForElement('xpath', "//*[@text='Bark Colour*']/../android.widget.Spinner", 3000);
        barkColour.click();
        let colours = await driver.waitForElements('class name', 'android.widget.CheckedTextView', 3000);
        await colours[3].click();

        let barkTexture = await driver.waitForElement('xpath', "//*[@text='Bark Texture*']/../android.widget.Spinner", 3000);
        barkTexture.click();
        let textures = await driver.waitForElements('class name', 'android.widget.CheckedTextView', 3000);
        await textures[1].click();
        // submit form
        let next = await driver.element('xpath', "//*[@text='Next']");
        await next.click();
        // check validation error
        let errorMsg = await driver.waitForElement('id', 'android:id/message', 3000);
        assert.equal(await errorMsg.text(), "please fix form errors");
        // press OK
        let okButton = await driver.element('id', 'android:id/button1');
        await okButton.click();
    })
    .then(async () => {
        // Second form:
        // Fill out the rest of the fields
        // Expected:
        // no error
        let treeHeight = await driver.waitForElement('xpath',
            "//*[@text='Tree Height (m)*']/../android.widget.EditText", 5000);
        await treeHeight.type(formValues.mandatory.treeHeight);
        let treeGirth = await driver.element('xpath', "//*[@text='Tree Girth at Base (m)*']/../android.widget.EditText");
        await treeGirth.type(formValues.mandatory.treeGirth);
        // submit form
        let next = await driver.element('xpath', "//*[@text='Next']");
        await next.click();
    })
    .then(async () => {
        // Form data should be displayed
        // Expected:
        // form data to match the input
        const separator = '  ';
        //Today's date e.g. "date": "2020-11-20"
        let today = new Date().toISOString().split('T')[0];
        let expected = [];
        await expected.push('{\n', separator,
            '\"location\": \"', formValues.mandatory.location, '\",\n', separator,
            '\"date\": \"', today, '\",\n', separator,
            '\"time\": \"', formValues.mandatory.time, '\",\n', separator,
            '\"weather\": \"', formValues.mandatory.weather, '\",\n', separator,
            '\"leaf_size\": \"', formValues.mandatory.leafSize, '\",\n', separator,
            '\"leaf_shape\": \"', formValues.mandatory.leafShape, '\",\n', separator,
            '\"bark_colour\": \"', formValues.mandatory.barkColour, '\",\n', separator,
            '\"bark_texture\": \"', formValues.mandatory.barkTexture, '\",\n', separator,
            '\"tree_height\": ', formValues.mandatory.treeHeight, ',\n', separator,
            '\"tree_girth_base\": ', formValues.mandatory.treeGirth, '\n}');
        let views = await driver.waitForElements('class name', 'android.view.View', 5000);
        await assert.equal(await views[1].text() , expected.join(""));
    })
    .fin(async () => {
        return await driver.quit();
    })
    .done();