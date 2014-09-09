exports.config = {
    allScriptsTimeout: 11000,

    seleniumServerJar: '../../../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.40.0.jar',
    chromeDriver: '../../../node_modules/chromedriver/lib/chromedriver/chromedriver',


    specs: [
        'e2e/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8080/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};