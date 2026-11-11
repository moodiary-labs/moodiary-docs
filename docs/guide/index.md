# Meet Moodiary

**Moodiary** is an open source diary app built with **Flutter** and **Rust**.

Write and read offline, with no ads or data collection. **Android** and **iOS** apps are available; desktop support is in development.

## What it does

- **Write entries**: the rich-text editor mixes text with images, audio and video, and supports Markdown.
- **Find entries again**: full-text search, filtering by category, a calendar timeline, and a trash for anything you delete.
- **Record your life**: choose from five mood levels, review mood insights, save places, log the weather, and revisit your footprints on a map.
- **Take your data with you**: export to Markdown, Word, PDF or long images, or back up and restore your whole diary.
- **Sync across devices**: sync over WebDAV, S3 / MinIO or your local network (LAN), with optional end-to-end encryption.
- **Stay private**: an app lock (password + biometrics), encrypted sync, and local-only storage.
- **Assistant**: connect an OpenAI- or Anthropic-compatible provider, including a self-hosted service; semantic search runs offline after downloading its model.

## Design principles

- **Your data is yours**: writing and browsing work offline. Online features connect to their respective services — see [Security and privacy](./privacy).
- **Black and white by default**: Moodiary ships with a quiet grayscale palette that keeps the focus on your words. You can switch to dynamic color that follows your system, or pick a custom accent color.
- **Native performance**: heavy work — image processing, encryption, sync, and word segmentation — runs in native Rust libraries, so the interface stays smooth.

## Current version

The latest release is **2.9.2**. Recent updates add five-level moods and mood insights, a rebuilt editor and calendar, storage management, and a configurable model download source. See the [release notes](https://github.com/ZhuJHua/moodiary/releases/tag/v2.9.2) and [changelog](https://github.com/ZhuJHua/moodiary/blob/develop/CHANGELOG.md).

## Get involved

Moodiary is shaped by its community. Whether you want to report a bug, suggest a feature, translate the app, write docs, or contribute code — you're welcome:

- Report issues or suggest features on [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues)
- Read the [developer docs](../dev/) to set up the environment and submit code
- Join the conversation in the [Telegram group](https://t.me/openmoodiary) or QQ group 760014526

If Moodiary has been helpful, you can also [buy the author a sandwich](https://github.com/ZhuJHua/moodiary#-sponsor).
