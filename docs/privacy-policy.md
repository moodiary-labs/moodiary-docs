# Privacy Policy

**Effective date: November 2, 2026**

This policy explains how the Moodiary app handles your data. Moodiary is an open source diary app developed by ZhuJHua and community contributors. Its [source code](https://github.com/ZhuJHua/moodiary) is public.

## Overview

- **The developer does not collect your data.** Moodiary has no account system and no server that stores your diary.
- **The app contains no advertising, analytics or crash-reporting SDKs,** and it does not track you.
- **Your data stays on your device by default.** It is sent to a service only when you use one of the features listed below.

## Data stored on your device

The following data is kept in the app's private storage:

- Diary text, photos, videos, audio recordings, moods, categories and tags;
- Places and weather you add to entries;
- AI assistant conversations and memories;
- App settings and error logs. Error logs stay on the device and the app does not upload them automatically.

API keys for third-party services and sync credentials are kept in the system's secure storage. The app lock password is stored only as a non-reversible derived value (Argon2id). Biometric checks are performed by the system, and the app cannot access your face or fingerprint data.

On-device features such as semantic search and mood suggestions run locally and do not send your diary content anywhere.

## Data that leaves your device

The table below lists the external services Moodiary can contact. Requests to any of them expose ordinary network information such as your IP address. Apart from the AI model catalog and model downloads, each one needs you to configure or select it first. The developer cannot access the content of these requests.

| Service | When data is sent | What is sent |
| --- | --- | --- |
| The AI provider you configure | When you send a message to the AI assistant | Your message and attachments, conversation context, relevant diary content read by the assistant's tools, and your API key |
| [models.dev](https://models.dev/) | When you view or choose preset AI providers and models | A request for the model catalog and provider logos, with no diary content |
| The WebDAV or S3 service you configure | When you sync or back up | Entries, media and settings, plus the credentials for that service. With end-to-end encryption on, the service sees only ciphertext |
| Other devices on the same local network | When you start a LAN transfer and enter the pairing code | The diary data you choose to transfer, encrypted in transit |
| [QWeather](https://www.qweather.com/) or the API host you enter | Once configured, when fetching weather or a place for an entry | Location coordinates, language setting and your API key |
| [OpenStreetMap](https://www.openstreetmap.org/) or [Tianditu](https://www.tianditu.gov.cn/) | When you select that map source and view a map | Map tile requests, which reveal the area you view. Tianditu requests also include your API key |
| [Hugging Face](https://huggingface.co/) or the download source you enter | When you download an on-device model | A request for the model files, with no diary content |
| GitHub | Android only, when you tap "Check for updates" | A request for the latest version |

Before you first use the AI assistant, the app tells you what is sent and lets you use the assistant only after you agree. You can also use a locally hosted model service, in which case conversations do not go to an external provider.

These services are run by their own providers or by you, and their own privacy policies apply. The developer has no data-sharing arrangement with them, so please decide for yourself whether to trust the services you choose.

When you share content through the system share sheet or open an external link, the app or website you choose handles that content.

## System permissions

These permissions are requested only when you use the related feature, and you can turn them off at any time in system settings:

| Permission | Purpose |
| --- | --- |
| Camera, microphone | Take photos and videos and record audio for your entries |
| Photo library | Choose photos and videos to add to entries, or save photos and videos |
| Location (while in use) | Add a place and weather to an entry. The app does not get your location in the background |
| Face ID or fingerprint | Unlock the app when App Lock is on |
| Local network | Transfer data with your other devices on the same Wi-Fi |

## Retention and deletion

Data stays on your device until you delete it.

- **Deleting an entry:** It moves to the recycle bin first, and is removed for good only when you delete it from there.
- **Deleting all local data:** Uninstall the app. Credentials in the iOS Keychain may remain after uninstalling, and device backups may contain app data if you have system backups turned on. You manage these in your system settings.
- **Deleting synced data:** Delete it directly on your WebDAV or S3 service.
- **Deleting data sent to an AI provider or other third party:** Follow that service's policy.
- **Withdrawing consent:** Stop using the feature, remove its credentials in the app, and turn off the related permissions in system settings.

The developer does not hold your data, so cannot look it up, export it or delete it for you. You can view, edit and export your own data directly in the app.

## App stores

When you download the app from the App Store or another platform, that platform handles the related data under its own privacy policy. It may give the developer aggregated download and usage statistics, and crash reports that users agreed to share. These do not contain your diary content.

## Minors

Moodiary is not aimed at any particular age group and does not knowingly collect anyone's personal information. Minors should use it with a guardian's guidance, especially when configuring or using third-party services.

## This website and the community

This policy covers only the Moodiary app. This documentation site uses a visitor analytics service, and the [official forum](https://answer.moodiary.net) runs on a separate community system. These websites process the related visit information when you use them.

## Changes to this policy

When this policy changes, this page and its effective date are updated. You can see earlier versions in the [documentation repository](https://github.com/ZhuJHua/moodiary-docs).

## Contact

If you have questions, reach us through [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues) or the [official forum](https://answer.moodiary.net). Please do not post diary content, API keys or other sensitive information in public channels.
