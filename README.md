# react-native-ble-advertise

[![npm version](https://badge.fury.io/js/react-native-ble-advertise.svg)](https://badge.fury.io/js/react-native-ble-advertise)

## Getting started

`npm install react-native-ble-advertise`

or

`yarn add react-native-ble-advertise`

Please setup EAS locally before continuing. See [EAS Setup](https://docs.expo.dev/build/setup/) for more information.

`npm install -g eas-cli`

`eas login`

`eas build:configure`

## Android Setup

To add permissions in Expo when we don't have direct access to Android manifest files due to using Expo, we can include
the necessary permissions in the `app.json` under the 'android' key.

```json
"android": {
  ...
  "permissions": [
    "android.permission.BLUETOOTH",
    "android.permission.BLUETOOTH_ADMIN",
    "android.permission.BLUETOOTH_ADVERTISE"
  ],
  ...
},
```

After adding a library, we can't run the application using the 'expo start' command anymore. Instead, we need to build
a development version of the application that we'll use in conjunction with the Expo application.

### EAS: Building the application

By using the command `eas build --profile development --platform android` an eas.json file will be created, containing
the entire setup. Additionally, you will need to accept some prompts and create an Android keystore and perform other tasks,
all of which can be accomplished by simply pressing the 'Enter' button in the terminal. Furthermore, in the app.json file,
it is necessary to add the projectId. Sometimes, this will be added automatically, but in case it doesn't, you will receive
a warning during the build process, indicating the need to add an 'eas' section with the projectId under 'extra' in app.json.

```json
"extra": {
  "eas": {
    "projectId": "<your-project-id>"
  }
}
```

### EAS: Running the application

After building the application, it will be available for download in the form of an APK file on the expo.dev website,
where you can view all your builds. This APK file needs to be downloaded to your mobile device and installed
(Android may raise a complaint about installing from unverified sources). Once the app is installed,
run `npx expo start --dev-client` in the terminal, and a QR code will be displayed. Scan this QR code with the Expo
application, and your application will launch.

## iOS Setup

It is necessary to set up the build with Apple, including configuring the bundle identifier. Additionally, the command
`eas device:create` must be used to add devices on which this application will run, as Apple is quite strict about these
measures. Unfortunately, I no longer have access to an Apple Developer account, so, for now, I'm unable to complete this
tutorial. However, it shouldn't be difficult if you continue to follow the documentation on EAS.

See [EAS Setup](https://docs.expo.dev/build/setup/) for more information.
