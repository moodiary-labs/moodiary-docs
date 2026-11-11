# Install and update

## Supported platforms

| Platform | Status | How to get it |
| --- | --- | --- |
| Android | Released | Download the APK from [GitHub Releases](https://github.com/ZhuJHua/moodiary/releases/latest) |
| iOS | Released | Download from the [App Store](https://apps.apple.com/app/id6740092321) |
| Windows / macOS / Linux | 🚧 In progress | Coming soon |

::: tip System requirements
Android needs **9.0 (API 28)** or later; iOS needs **16.0** or later.
:::

## Install the Android app

1. Open the [Releases](https://github.com/ZhuJHua/moodiary/releases) page;
2. Find the `apk` attachment under the latest release and download it;
3. If your system warns about installing an app from an "unknown source", allow the installation to continue.

The package targets `arm64-v8a` devices — that is, the vast majority of phones and tablets from recent years.

## Install the iOS app

Open [Moodiary on the App Store](https://apps.apple.com/app/id6740092321) and install it.

## Update

- **Android**: use **Settings → About → Check for updates**, or download the latest APK from GitHub Releases and install it over the existing app.
- **iOS**: update through the App Store. Automatic updates follow your App Store settings.

::: warning Before updating
Keep a [backup](./export-import#backup) before updating. You do not need to uninstall the app.
:::

## Where your data lives

Entries and metadata are stored in a local SQLite database; media files are stored separately in the app's private directory. Uninstalling the app **deletes your local entries and media**, so:

- Before you switch phones or reinstall, first [export](./export-import) or [sync](./sync) your data;
- The app cannot read other apps' directories, and a system "clear storage" action will also wipe your diary.
