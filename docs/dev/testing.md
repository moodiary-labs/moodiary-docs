# Testing

Moodiary has Dart, Rust and editor test suites. `.github/workflows/quality.yml` selects CI jobs by PR paths; a manual dispatch runs all three.

## Dart

```bash
fvm dart tool/task.dart test          # affected packages
fvm dart tool/task.dart test --all    # whole repository
fvm dart tool/task.dart test-mobile   # mobile/ only
```

- The default baseline is the merge-base of `HEAD` and `origin/develop` (falling back to `HEAD` if unavailable). `--diff=<ref>` overrides it. Uncommitted and untracked files are included, as are transitive dependents of changed packages.
- Root `pubspec.yaml` or `pubspec.lock` changes select all packages, as does `--all`.
- The runner passes the selected `test/` directories to **one `flutter test` process at the repository root**; hooks and the frontend compiler run once.
- Only legacy database migration tests need `ISAR_TEST_DYLIB`.

### Writing repository tests

Construct an in-memory database and enable foreign keys when testing cascades:

```dart
final db = MoodiaryDatabase.forTesting(NativeDatabase.memory());
await db.customStatement('PRAGMA foreign_keys = ON');
addTearDown(db.close);
final repo = DiaryRepository(db);
```

Higher layers can register fakes in get_it:

```dart
setUp(() {
  getIt.registerSingleton<DiaryRepository>(FakeDiaryRepository());
});

tearDown(getIt.reset);
```

Tests run with the repository root as cwd. Read repository files through `repoRoot` from `package:moodiary_lint/testing.dart`; write temporary data into each test's own `Directory.systemTemp.createTempSync()` directory and clean it up.

## Rust

Each of the six native packages has its own crate; run checks in all of them:

```bash
for d in packages/foundation/*/rust; do
  (cd "$d" && cargo clippy --all-targets -- -D warnings && cargo test)
done
```

A `cargo test --workspace` in one crate does not cover the other crates.

## The editor (WebView)

```bash
cd packages/feature_base/moodiary_editor/editor
corepack pnpm install --frozen-lockfile
corepack pnpm type-check
corepack pnpm test
```

## What CI runs

| Job | Contents |
| --- | --- |
| Dart | `check_generated` → `flutter analyze` → `check_layers` → `task.dart test --all` |
| Rust | `cargo clippy --all-targets -- -D warnings` and `cargo test` across all six native packages |
| Editor | Frozen-lockfile install, `pnpm type-check` and `pnpm test` |

Run `fvm dart tool/task.dart analyze`, `test --all`, and the Rust / editor commands above for full local verification.

The editor and license-manifest hooks skip host-target builds. **Rust hooks build for the host locally**; CI disables the six in-repo Rust hooks before Dart tests. Dart tests never load these libraries; `sqlite3_simple`, `sqlite3_vec` and `flutter_js` still build their required host assets. The root pubspec dev-depends on `moodiary_data` and `moodiary_assistant` to include these hooks.

Regenerate missing sources using [Code generation](./codegen). There is no root `test/` directory, so bare `flutter test` at the root needs explicit package test paths; `task.dart` supplies them.
