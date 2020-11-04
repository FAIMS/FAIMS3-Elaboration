# FAIMS3-Elaboration
A project to explore technologies in FAIMS3 

## To run e2e tests:

### Pre-requisites:
- Node.js v10 or higher
- Install Appium's Node.js client library 

  `npm install wd`

### Steps: 
1. Upload the app and make sure it's reflected in the test.

    `'app': 'bs://87f241809661b3baa5fe15f6ad97322fd28b0a0e'`
   
   This can be done via BrowserStack's file manager or REST API:
   
   `curl -u "<username>:<password>" -X POST "https://api-cloud.browserstack.com/app-automate/upload" -F "file=@/path/to/app/file/Application-debug.apk"`
    
2. Set access credentials in [environment.js](https://github.com/FAIMS/FAIMS3-Elaboration/blob/master/src/e2e/environment.js).

3. Execute the tests:

   `node <test file name>`


