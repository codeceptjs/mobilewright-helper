import path from 'node:path'

export const config = {
  tests: './*_test.js',
  output: './output',
  noGlobals: true,
  helpers: {
    // in your own project use: require: '@codeceptjs/mobilewright'
    Mobilewright: {
      require: '../index.js',
      platform: 'android',
      app: 'com.saucelabs.mydemoapp.rn',
      installApps: path.resolve(import.meta.dirname, '../test/data/MyRNDemoApp.apk'),
      actionTimeout: 10000,
      waitForTimeout: 10000,
      animations: 'off',
    },
  },
  plugins: {
    screenshot: { enabled: true },        // screenshot on failure
    retryFailedStep: { enabled: true },
  },
  name: 'mobilewright-demo',
}
