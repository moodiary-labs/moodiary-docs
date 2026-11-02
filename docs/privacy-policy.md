# Privacy Policy

**Effective date: November 2, 2026**

Moodiary (the "App") is an open-source diary app developed by ZhuJHua and community contributors (collectively, "we" or "the Developer"). The [source code](https://github.com/ZhuJHua/moodiary) is publicly available for inspection and verification.

This policy explains how the App handles your information. Please read it in full before using the App. By using the App, you confirm that you understand the practices described below.

## Scope

This policy applies to all client versions of the App offered on any platform. In this policy, "you" means the end user of the App, and "we" or "the Developer" means the open-source author and contributors of the App.

## Summary

- **We do not collect your data.** The App has no account system and no server that stores diaries.
- **The App contains no advertising, analytics, or crash-reporting SDKs,** and does not track you across other apps or websites.
- **Your data stays on your device by default.** Data is sent to a third-party service only when you use the features described below.

## Data Stored on Your Device

The App keeps the following in its private storage:

- diaries, along with their images, videos, audio recordings, moods, categories, and tags;
- the locations and weather associated with your entries;
- AI assistant conversations and long-term memory;
- app settings and error logs (logs remain on your device and are never uploaded automatically).

API keys and sync credentials are stored in the secure storage provided by the operating system. The app lock stores only an irreversible value derived from your password using Argon2id. Biometric authentication is performed by the operating system; the App cannot access your face or fingerprint data.

On-device features such as semantic search and mood suggestions run entirely on your device and do not send diary content anywhere.

## Data That Leaves Your Device

The App may contact the services listed below. Any network request necessarily exposes information such as your IP address to the recipient. Except for the AI model catalog and model downloads, each service requires configuration or explicit activation on your part; we are not involved in these transfers and cannot see their contents.

| Recipient | When it is sent | What is sent |
| --- | --- | --- |
| AI service provider you configure | When you send a message to the AI assistant | Your message and attachments, conversation context, diary content the assistant reads through tool calls, and the API key used for authentication |
| [models.dev](https://models.dev/) | When you browse or select preset AI providers and models | Requests for the model catalog and provider logos; no diary content |
| WebDAV or S3 service you configure | When you sync or back up | Entries, categories, media files and sync credentials. With end-to-end encryption enabled, the provider can only access ciphertext |
| The device you pair with on the same local network | When you start a local transfer and complete pairing | Entries, categories and media the other device doesn't have yet. Transfers are encrypted with a key derived from the pairing code |
| [QWeather](https://www.qweather.com/) or an API endpoint you specify | When the App fetches weather or location data for an entry, after configuration | Coordinates, language settings, and your API key |
| [OpenStreetMap](https://www.openstreetmap.org/) or [Tianditu](https://www.tianditu.gov.cn/) | When you select that map source and view the map | Tile requests, which reveal the area you are viewing; Tianditu also receives your API key |
| [Hugging Face](https://huggingface.co/) or a download source you specify | When you download an on-device model | Requests to download model files; no diary content |
| GitHub | When you check for updates from within the App (Android only) | A request for the latest release |

Before you first use the AI assistant, the App presents a dedicated notice describing what will be sent to the external provider, and the feature remains unavailable until you consent. If you use a locally deployed model, your conversations are not sent to any external provider.

These services are operated by their respective providers or by you, and each is governed by its own privacy policy and data practices. We have no data-sharing arrangement with any of them.

Content you share through the system share sheet, and external links you open, are handled by the app or website you choose.

## Device Permissions

The permissions below are requested only when you use the corresponding feature, and you can revoke them at any time in your system settings.

| Permission | Purpose |
| --- | --- |
| Camera, microphone | Take photos, record video, or record audio for diary entries |
| Photo library | Add photos and videos to entries, or save photos and videos from entries to your library |
| Location (while in use) | Add location and weather information to entries. The App does not access your location in the background or track it continuously |
| Face ID or fingerprint | Unlock the App when the app lock is enabled |
| Local network | Transfer diary data with another device on the same Wi-Fi network |

## Data Retention and Deletion

Data remains on your device until you delete it.

- **Diaries:** a deleted entry is moved to the recycle bin and is erased only when permanently deleted from the bin.
- **AI assistant memory:** cleared memory is permanently deleted, is not moved to the recycle bin, and cannot be recovered.
- **Local data:** uninstalling the App removes it, although credentials in the iOS keychain may persist. If you use system backups, your device backup may contain App data, which you manage in your system settings.
- **Synced data:** delete it from your own WebDAV or S3 service.
- **Data already sent to an AI provider or another third party:** handled under that provider's policy; we cannot delete it on your behalf.
- **Withdrawing consent:** disable the relevant feature, remove the associated credentials in the App, and revoke the corresponding permission in your system settings.

Because we do not hold your data, we cannot look up, export, or delete it for you. You can view, edit, and export your data in the App at any time.

## App Stores

Distribution platforms such as the App Store process download and installation data under their own privacy policies, and may provide us with aggregated download figures, usage statistics, and crash reports that users have agreed to share. None of this information includes diary content.

## Minors

The App is not designed for any particular age group, and we do not knowingly collect personal information from any user. Minors should use the App under the guidance of a guardian, particularly when configuring or using third-party services.

## Changes to This Policy

When this policy changes, we will update this page and the effective date. Previous versions are available in the [documentation repository](https://github.com/ZhuJHua/moodiary-docs).

## Contact

If you have questions about this policy, contact us through [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues). Please do not post diary content, API keys, or other sensitive information in that public channel.
