# FAIMS3-Elaboration
A project to explore technologies in FAIMS3 

## To build Android (or IOS) App

Build the web application:

```
npm run build
```
Copy over the assets to the mobile app:

```
npx cap copy
```

Open up platform developer tools:

```
npx cap open android
```

In the developer tools, run the project.

When the app is updated, running the build and copy steps will copy the new version over, you can then re-run the platform app to see the update.


## To run e2e tests:

### Pre-requisites:
- Node.js v10 or higher
- Install Appium's Node.js client library 

  `npm install wd`

### Steps: 
1. Upload the app and make sure it's reflected in the [appUrl](https://github.com/FAIMS/FAIMS3-Elaboration/blob/master/src/e2e/environment.js)

    `'app': 'bs://87f241809661b3baa5fe15f6ad97322fd28b0a0e'`
   
   This can be done via BrowserStack's file manager or REST API:
   
   `curl -u "<username>:<password>" -X POST "https://api-cloud.browserstack.com/app-automate/upload" -F "file=@/path/to/app/file/Application-debug.apk"`
    
2. Set access credentials in [environment.js](https://github.com/FAIMS/FAIMS3-Elaboration/blob/master/src/e2e/environment.js).

3. Execute the tests:

   `node <test file name>`


