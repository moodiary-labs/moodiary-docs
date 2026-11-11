# Development environment

Moodiary is a **Flutter + Rust** monorepo. Run the commands below from the repository root.

## Tools you need

| Tool | Version | Notes |
| --- | --- | --- |
| [FVM](https://fvm.app/) | Not pinned | Selects the SDK from `.fvmrc` |
| Flutter / Dart | **3.47.8 / 3.13.0** | `.fvmrc` pins Flutter; pubspec SDK constraints are lower bounds |
| Rust | **1.99.1 stable** | Requires `rustup`; each native package pins it in `rust/rust-toolchain.toml` |
| Node.js + corepack | CI uses **24**; editor declares `^20.19.0` or `>=22.12.0` | corepack must be available; the editor pins pnpm in `package.json` |
| JDK | **21** | Android's daemon JVM is pinned to 21 |
| Android SDK | API 36, NDK 28.2.13676358 | The app targets arm64, Android API 28 or later |
| Xcode | CI uses **27.1** | iOS deployment target: **16.0**; iOS development requires macOS |
| [melos](https://pub.dev/packages/melos) | **8.6.0** | Pinned in the root `pubspec.yaml`; its CLI must be on `PATH` |
| [cargo-about](https://github.com/EmbarkStudios/cargo-about) | **0.9.2** | Generates the third-party license manifest at build time |

Rustup selects the pinned toolchain when Cargo runs inside a package's `rust/` directory; the repository root has no Rust toolchain file.

## Bootstrapping

```bash
git clone https://github.com/ZhuJHua/moodiary.git
cd moodiary

fvm use
fvm dart pub global activate melos 8.6.0
fvm dart tool/task.dart setup  # flutter pub get
melos bootstrap              # workspace activation and IDE module files; no codegen
cargo install cargo-about --version 0.9.2 --locked
```

The editor's WebView bundle is built by a hook on run/build. Check `corepack pnpm --version` in `packages/feature_base/moodiary_editor/editor`; if corepack is missing, install it with `npm install -g corepack`.

## Verifying your setup

```bash
fvm dart tool/task.dart analyze   # generated-binding consistency + layer check + flutter analyze
fvm dart tool/task.dart test      # affected packages; use --all for the whole repository
```

See [Testing](./testing) for Rust and editor checks and the optional legacy migration test library.

## Running the app

```bash
fvm dart tool/task.dart run -- --flavor production  # Android
fvm dart tool/task.dart run                         # iOS; select an iOS device
fvm dart tool/task.dart run -- --flavor alpha --release
```

Extra Flutter arguments go after `--`. The supported app targets are **Android** (`build-apk`, production flavor by default) and **iOS** (`build-ios`).

## Next steps

- [Repository structure and layers](./architecture): how the code is organized.
- [Common commands](./workflow): everyday commands.
- [FAQ](./faq): start here when a build fails.
