# Coding conventions

These conventions are what keep more than 30 packages consistent as they evolve. Please read through them before you open a PR.

## Layers and imports

- Respect the `foundation → core → feature_base → feature → apps` direction; `tool/check_layers.dart` will catch violations.
- Import Material APIs through `package:mui/mui.dart`, which exports `material_ui`; avoid direct `package:flutter/material.dart` imports except for the picker compatibility shim.
- `mui` complements Material rather than replacing it: use Material when it is enough, and only add to `mui` (with an `M` prefix) when it is not.
- Themes are constructed in exactly one place, `buildMuiTheme()` in `mui`; read values from `ColorScheme` / `TextTheme` and `MuiTokens`.

## Barrel exports and visibility

- Package barrels use **bare exports** (no `show`).
- Prefix anything you do not want to share with `_`.
- Mark symbols that are needed inside the package but should not be public with `@internal`, and `hide` them in the barrel.
- Mark test-only symbols with `@visibleForTesting`.
- Reserve `show` for the cases where it genuinely cannot be avoided (FRB output, third-party re-exports, picker skins).

## Dependency injection: get_it + injectable

- Put binding annotations on the **implementation class** (`@Singleton(as:)` and friends).
- There is a single `configureDependencies` in the whole repository (`mobile/lib/app/di/di.dart`); infrastructure packages hook in as micro-modules.
- Always resolve with `getIt<X>()`; production registrations are generated except for the sync session scope. Tests may register fakes directly.
- Do not use `@PostConstruct` — startup logic belongs in the bootstrap in `main`.
- After changing an annotation you must run `fvm dart tool/task.dart build-runner`, and the generated files need to be committed.

## Routing: go_router + extra

- Route classes all live in `moodiary_router`, and each route holds a `location` and `params`.
- The app does not target the web, so **path and query parameters are not used**; parameters are passed through `extra` with snake_case keys.
- Keep `params` to JSON scalars (ids, booleans and so on) — objects get snapshotted and go stale when state is restored.
- Every page provides a `factory X.fromRoute(GoRouterState)`.

## Internationalization: slang

- Use `context.l10n.xxx` for copy (it refreshes when the language changes); use the top-level `l10n.xxx` in services and callbacks.
- Pass parameters by name and spell keys out in full — local aliases make the analyzer report keys as dead.
- App strings live in `i18n/flutter`; mui strings live in its own `lib/src/i18n`. After editing a `*.i18n.json`, run `fvm dart tool/task.dart i18n` and commit the generated files.
- Text aimed at models (prompts, tool descriptions) is hardcoded in English and stays out of i18n.
- `mui` ships its own separate slang output (`context.muiL10n`).
- Editor translations in `i18n/web/{zh,en}.json` are bundled as-is and need no slang generation.

## KV storage

- `IKVStorage.set / remove / clear` are synchronous and return `void`.
- Keys only support `int / bool / double / String / List<String>`.
- Secrets (PINs, API keys) go in `MoodiarySecureKVs`.
- The app lock passcode always goes through `AppLockPin` — never read or write `password` directly.

## Rust and native libraries

- Every native package owns its crate, native library, build hook, `rust-toolchain.toml` and `Cargo.lock`.
- `[workspace.dependencies]` is **not used**: shared crates are pinned separately in each package, and `tool/check_generated.dart` verifies that the versions match.
- After changing `rust/src/api` you must run `fvm dart tool/task.dart gen-rust`.
- Opaque handles (such as `CancelToken`) cannot cross `.so` boundaries: each library constructs its own, after initializing that library's runtime.
- Use each package's runtime entry point; images initialize at startup through `FastImageRuntime.init()`, while other runtimes use `ensureInitialized()` (crypto initializes through its facade).
- Custom Kotlin / Swift integrations use Pigeon in `moodiary_native`; regenerate them with `fvm dart tool/task.dart pigeon`.

## Commits and versions

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), which the local release script uses to generate the CHANGELOG.
- To keep a PR out of the CHANGELOG, put `Changelog: skip` in the body of the squashed commit, or use one of the skipped scopes (`chore(deps|readme|pr|pull)`).
- Keep dependency versions pinned, including melos in the root `pubspec.yaml`, and align shared native pins across packages.
