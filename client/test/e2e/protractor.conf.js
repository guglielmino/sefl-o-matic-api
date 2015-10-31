exports.config = {

 // seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: '../../../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',
  specs: ['*.spec.js'],
  baseUrl: 'http://localhost:9000',
  capabilities: {
    browserName: 'chrome'
  }
};