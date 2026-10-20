# Mobilewright Demo

End-to-end tests for the [Sauce Labs My Demo App](https://github.com/saucelabs/my-demo-app-rn) (React Native), run with CodeceptJS and the Mobilewright helper — no Appium server involved.

## Prerequisites

- Node.js 22.12+
- An Android emulator (or iOS simulator) booted, or a connected device

Check your environment:

```sh
npx mobilewright doctor
npx mobilewright devices
```

Download the demo APK (the same one CI uses):

```sh
mkdir -p ../test/data
curl -fsSL -o ../test/data/MyRNDemoApp.apk https://github.com/saucelabs/my-demo-app-rn/releases/download/v1.3.0/Android-MyDemoAppRN.1.3.0.build-244.apk
```

## Run

From this folder:

```sh
npm i
npm i ../        # install the helper from this repository
npm test
```

For iOS: set `platform: 'ios'` in `codecept.conf.js` and install the simulator build (a `.zip` of the `.app` bundle) instead of the APK — see the links in `.github/workflows/ios.yml`.

The config uses `require: '../index.js'` so the demo runs straight from the repo checkout. In your own project install the published package instead:

```sh
npm i @codeceptjs/mobilewright --save-dev
```

and change the helper config to `require: '@codeceptjs/mobilewright'`.

## What it demonstrates

- launching and resetting the app between tests (`restart: 'app'`)
- locating elements: by visible text, by accessibility id (`~`), by the label next to a field
- deep links (`mydemoapprn://login`)
- filling fields with `secret()` to keep passwords out of logs
- screen rotation
- full-page and element screenshots

## Known flakiness

The login scenario may fail intermittently: after a deep link (or the post-login navigation) the accessibility tree dump sometimes comes back empty (a bare root node) even though the screen is rendered — visible on a screenshot, missing from `grabSource()`. Relaunching the app does not always recover it. This is an upstream mobilecli/mobilewright issue (Android emulator + React Native), not a problem in the test or the helper.
