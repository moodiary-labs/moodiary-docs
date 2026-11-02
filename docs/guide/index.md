# Meet Moodiary

**Moodiary** is an open source diary app built with **Flutter** and **Rust**.

It works entirely offline: everything you write stays on your own device, with no ads and no data collection. **Android** and **iOS** apps are available today; the desktop app is being rebuilt.

## What it does

- **Write entries**: the rich-text editor mixes text with images, audio and video, and supports Markdown.
- **Find entries again**: full-text search, filtering by category, a calendar timeline, and a trash for anything you delete.
- **Record your life**: save the places you visit often, log the weather, and replay your footsteps on a map.
- **Take your data with you**: export to Markdown, Word, PDF or long images, or back up and restore your whole diary.
- **Sync across devices**: sync over WebDAV, S3 / MinIO or your local network (LAN), with optional end-to-end encryption.
- **Stay private**: an app lock (password + biometrics), encrypted sync, and local-only storage.
- **Assistant**: connect any OpenAI- or Anthropic-compatible provider (self-hosted Ollama works too); mood suggestions and semantic search run fully offline on-device.

## Design principles

- **Your data is yours**: the app runs offline. Apart from the third-party services you choose to configure (weather, maps, sync, AI), it never sends anything to a server.
- **Black and white by default**: Moodiary ships with a quiet grayscale palette that keeps the focus on your words. You can switch to dynamic color that follows your system, or pick a custom accent color.
- **Native performance**: heavy work — image processing, encryption, sync, and word segmentation — runs in native Rust libraries, so the interface stays smooth.

## Current version

The current version is **2.8.1**. See the [CHANGELOG](https://github.com/ZhuJHua/moodiary/blob/master/CHANGELOG.md) for details.

## Get involved

Moodiary is shaped by its community. Whether you want to report a bug, suggest a feature, translate the app, write docs, or contribute code — you're welcome:

- Report issues or suggest features on [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues)
- Read the [developer docs](../dev/) to set up the environment and submit code
- Join the conversation in the [Telegram group](https://t.me/openmoodiary) or QQ group 760014526

If Moodiary has been helpful, you can also [buy the author a sandwich](https://github.com/ZhuJHua/moodiary#-sponsor).
