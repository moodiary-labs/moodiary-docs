# FAQ

The usual pitfalls on the development side. For questions as a user, use [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues).

## Building and running

### `flutter test` finds no tests

There are no tests in the repository root. Use `dart tool/task.dart test` (which fans out to the packages) and `test-mobile`.

### The APK size doesn't change after I modify a Rust dependency

The build hook cache lives in `.dart_tool/hooks_runner/`, and `flutter clean` does **not** clear it. Run:

```bash
dart tool/task.dart clean
```

### The build complains that editor assets are missing

The WebView assets for `moodiary_editor` are produced by a build hook on the first run/build, which needs **corepack** to be available (it ships with Node). Check that `corepack pnpm --version` works.

### `gen-rust` refuses to run

The `flutter_rust_bridge_codegen` CLI doesn't match the version pinned in the pubspec. Install the matching one:

```bash
cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
```

### The Gradle / Android build fails

- Check that your JDK is **21** (the daemon JVM is pinned by `gradle-daemon-jvm.properties`).
- The Android SDK needs API 36 and NDK 28.2.13676358.
- The Gradle distribution is downloaded from a Tencent mirror, so you may need to configure a proxy on a restricted network.

### The Rust toolchain is wrong

Each native package's `rust/rust-toolchain.toml` pins **1.95.0 stable**, and `rustup` installs it during the build. If you switched your global toolchain by hand, running any `cargo` command back inside the repository is enough to override it.

## Layers and analysis

### `check_layers` reports an error

The layer check treats `tool/layer_baseline.txt` as a zero baseline. The usual causes are:

- a lower-layer package depending on a higher-layer one;
- packages in the same layer referencing each other (core and feature_base have an internal order);
- product code importing `'package:flutter/material.dart'` directly, which should be `import 'package:mui/mui.dart'`.

### `check_generated` reports an error

The `Cargo.toml` files, toolchains and FRB / ffigen versions of the six native packages have to match exactly. Usually one package was upgraded on its own, so align the rest or revert it.

### analyze says an i18n key is dead

Referring to a copy key through a local alias throws the analyzer off. Spell out `l10n.xxx.yyy` in full.

## Testing

### The migration tests are skipped

The legacy database migration tests need a path to the dynamic library:

```bash
export ISAR_TEST_DYLIB=/path/to/libisar.dylib
```

### Tests interfere with each other

Tests that rely on `getIt` need `getIt.reset` in `tearDown`, with the fakes registered in `setUp`.

## Anything else

### I want to add a new feature package

1. Put it in the right layer (see [Repository structure and layers](./architecture)).
2. Register it in `workspace` in the root `pubspec.yaml` and in the Melos `categories`.
3. If it belongs to core or feature_base, check whether the intra-layer order needs updating.

### I want to contribute to the desktop version

The desktop version is being rewritten. The package layering already leaves room for it, but there is no usable desktop target today. You're welcome to join the discussion in Issues.
