# Code generation

Generated sources are committed. Regenerate after changing their inputs and include the output in the same change. Run these commands from the repository root.

## Dart code generation (build_runner)

```bash
fvm dart tool/task.dart build-runner
```

Runs `build_runner` sequentially in all workspace packages that depend on it, then `dart format .`. Use it after changing injectable bindings, Freezed models, JSON serialization or drift tables; running only in `mobile/` misses package inputs.

## Rust FFI bindings (flutter_rust_bridge)

```bash
cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
fvm dart tool/task.dart gen-rust
```

Run after changing a native package's `rust/src/api`. The task checks the CLI against the pinned FRB version, regenerates all six packages, then runs `cargo fmt` and analyzes their generated Dart bindings.

## Internationalization (slang)

```bash
fvm dart tool/task.dart i18n
```

Run after editing app sources in `i18n/flutter/*.i18n.json` or mui's `lib/src/i18n/*.i18n.json`. App output goes into `moodiary_i18n`. Editor translations in `i18n/web/{zh,en}.json` are bundled as-is and need no slang generation. CI does not check whether slang output is up to date.

## Platform bindings (Pigeon)

```bash
fvm dart tool/task.dart pigeon
```

Run after editing `packages/foundation/moodiary_native/pigeons/*.dart`; it regenerates the Dart and configured Kotlin / Swift bindings.

## Database migrations (drift)

```bash
fvm dart tool/task.dart migrations
fvm dart tool/task.dart build-runner
```

After changing `.drift` tables, bump `schemaVersion` if the current version has shipped; otherwise update the unreleased step. `migrations` generates the schema snapshot and step helpers. Implement the migration step before running `build-runner`, commit the generated schema files, and verify `packages/feature_base/moodiary_data/test/db_migration_test.dart`. Details are in `packages/feature_base/moodiary_data/AGENTS.md`.

## Combined generation

```bash
fvm dart tool/task.dart gen  # gen-rust + i18n + pigeon
```

`build-runner` and `migrations` are separate commands.

## Consistency checks and build hooks

`tool/check_generated.dart` runs during `analyze` and CI. It checks FRB versions and paired binding hashes, shared crate pins, toolchain channels and FRB / ffigen pins across native packages. It does not require every crate's `Cargo.toml` to be identical.

Native libraries use **Native Assets build hooks**; their cache is `.dart_tool/hooks_runner/`. `fvm dart tool/task.dart clean` removes that cache and the editor bundle when a stale build survives `flutter clean`.

The editor and license-manifest hooks skip host-target builds. Rust hooks also build for the host; CI's Dart job disables them with `hooks.user_defines.<pkg>.build_assets: false`. Dart tests do not load these Rust libraries, but need the host code assets from `sqlite3_simple`, `sqlite3_vec` and `flutter_js`.
