# Privacy Policy

**Effective date: November 2, 2026**

Moodiary is an open source diary app by ZhuJHua and community contributors. Its [source code](https://github.com/ZhuJHua/moodiary) is public.

## Overview

- **The developer does not collect your data.** Moodiary has no account system or server storing diaries.
- **The app has no advertising, analytics or crash-reporting SDKs** and does not track you.
- **Data stays on your device by default.** It goes to a service only when you use a feature listed below.

## Data stored on your device

The app's private storage holds:

- Diary text, photos, videos, audio recordings, moods, categories and tags;
- Places and weather you add to entries;
- AI assistant conversations and memories;
- Settings and error logs. Logs are not uploaded automatically.

API keys and sync credentials use the system's secure storage. The app lock password is stored only as a non-reversible derived value (Argon2id). The system handles biometrics; the app cannot access your face or fingerprint data.

On-device features such as semantic search and mood suggestions do not send diary content.

## Data that leaves your device

Moodiary can contact the services below. Requests expose ordinary network information such as your IP address. Except for the AI model catalog and model downloads, you must configure or select each service first. The developer cannot see request content.

| Service | When data is sent | What is sent |
| --- | --- | --- |
| Your configured AI provider | Sending the AI assistant a message | Your message, attachments, conversation context, relevant diary content read by the assistant's tools, and API key |
| [models.dev](https://models.dev/) | Viewing or choosing preset AI providers and models | Requests for the model catalog and provider logos; no diary content |
| Your configured WebDAV or S3 service | Syncing or backing up | Entries, media, settings and service credentials. With end-to-end encryption on, the service sees only ciphertext |
| Devices on the same local network | Starting a LAN transfer and entering the pairing code | Your chosen diary data, encrypted in transit |
| [QWeather](https://www.qweather.com/) or your custom API host | After configuration, fetching weather or a place for an entry | Coordinates, language setting and API key |
| [OpenStreetMap](https://www.openstreetmap.org/) or [Tianditu](https://www.tianditu.gov.cn/) | Selecting that map source and viewing a map | Tile requests revealing the area viewed; Tianditu also receives your API key |
| [Hugging Face](https://huggingface.co/) or your custom download source | Downloading an on-device model | Requests for model files; no diary content |
| GitHub | Android only, tapping "Check for updates" | A request for the latest version |

Before you first use the AI assistant, the app explains what is sent and requires your agreement. With a locally hosted model, conversations do not go to an external provider.

These services are run by their providers or by you, under their own privacy policies. The developer has no data-sharing arrangement with them.

Content shared through the system share sheet and external links are handled by your chosen app or website.

## System permissions

Permissions are requested only when you use the feature. You can turn them off in system settings:

| Permission | Purpose |
| --- | --- |
| Camera, microphone | Take photos and videos, and record audio for entries |
| Photo library | Add photos and videos to entries, or save them |
| Location (while in use) | Add places and weather to entries. The app never gets your location in the background |
| Face ID or fingerprint | Unlock the app with App Lock on |
| Local network | Transfer data between your devices on the same Wi-Fi |

## Retention and deletion

Data stays on your device until you delete it.

- **Entries:** Deleted entries go to the recycle bin first. Delete them there to remove them permanently.
- **Local data:** Uninstalling deletes it, but iOS Keychain credentials may remain. If system backups are on, device backups may contain app data. Manage these in system settings.
- **Synced data:** Delete it on your WebDAV or S3 service.
- **Data sent to AI providers or other third parties:** Follow that service's policy.
- **Withdrawing consent:** Stop using the feature, remove its credentials in the app and turn off its permissions in system settings.

The developer holds no data and cannot look it up, export it or delete it for you. You can view, edit and export your data in the app.

## App stores

The App Store and other download platforms process download data under their own privacy policies. They may give the developer aggregated download and usage statistics and crash reports users agreed to share, without diary content.

## Minors

Moodiary is not aimed at any age group and does not knowingly collect personal information. Minors should use it with a guardian's guidance, especially when configuring or using third-party services.

## This website and the community

This policy covers only the Moodiary app. This documentation site uses visitor analytics; the [official forum](https://answer.moodiary.net) is a separate system. Both process visit information.

## Changes to this policy

Changes update this page and its effective date. Earlier versions are in the [documentation repository](https://github.com/ZhuJHua/moodiary-docs).

## Contact

Contact us through [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues) or the [official forum](https://answer.moodiary.net). Please do not post diary content, API keys or other sensitive information publicly.
