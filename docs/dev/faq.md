# FAQ

The usual pitfalls on the development side. For questions as a user, use [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues).

## Building and running

### `flutter test` finds no tests

There are no tests in the repository root. Use `fvm dart tool/task.dart test` (one root process with explicit package test paths), or `test-mobile` for the app. See [Testing](./testing).

### The APK size doesn't change after I modify a Rust dependency

The build hook cache lives in `.dart_tool/hooks_runner/`, and `flutter clean` does **not** clear it. Run:

```bash
fvm dart tool/task.dart clean
```

### The build complains that editor assets are missing

The WebView assets for `moodiary_editor` are produced by a build hook on the first run/build, which needs **corepack** on `PATH`. If missing, run `npm install -g corepack`; then check `corepack pnpm --version` from the editor directory.

### `gen-rust` refuses to run

The `flutter_rust_bridge_codegen` CLI doesn't match the version pinned in the pubspec. Install the matching one:

```bash
cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
```

### Android asks for a flavor

Use `fvm dart tool/task.dart run -- --flavor production` (or `alpha`). `build-apk` defaults to production, but `run` does not supply a flavor.

### The Gradle / Android build fails

- Check that your JDK is **21** (the daemon JVM is pinned by `gradle-daemon-jvm.properties`).
- The Android SDK needs API 36 and NDK 28.2.13676358.
- The Gradle distribution is downloaded from a Tencent mirror, so you may need to configure a proxy on a restricted network.

### The Rust toolchain is wrong

Each native package's `rust/rust-toolchain.toml` pins **1.99.1 stable**, and `rustup` installs it during the build. Run Cargo inside a package's `rust/` directory to select that toolchain; the repository root has no toolchain file.

## Layers and analysis

### `check_layers` reports an error

The layer check treats `tool/layer_baseline.txt` as a zero baseline. The usual causes are:

- a lower-layer package depending on a higher-layer one;
- same-layer dependencies outside the allowed core / feature_base order or shared Rust hook;
- product code importing `'package:flutter/material.dart'` directly, which should be `import 'package:mui/mui.dart'`.

### `check_generated` reports an error

Shared crate pins, toolchain channels and FRB / ffigen versions must agree across native packages; paired FRB bindings must also match their pins and content hashes. Usually one package was upgraded on its own, so align the rest or revert it.

### analyze says an i18n key is dead

Referring to a copy key through a local alias throws the analyzer off. Spell out `l10n.xxx.yyy` in full.

## Testing

### The migration tests are skipped

The legacy database migration tests need a path to the dynamic library:

```bash
export ISAR_TEST_DYLIB=/path/to/libisar.dylib
```

### Tests interfere with each other

Tests that rely on `getIt` need `tearDown(getIt.reset)`, with the fakes registered in `setUp`.

## Anything else

### I want to add a new feature package

1. Put it in the right layer (see [Repository structure and layers](./architecture)).
2. Register it in `workspace` in the root `pubspec.yaml` and in the Melos `categories`.
3. If it belongs to core or feature_base, check whether the intra-layer order needs updating.

### I want to contribute to the desktop version

The current repository contains only the mobile app target. The shared package layers leave room for desktop support. You're welcome to join the discussion in Issues.
