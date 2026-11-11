# Release process

The release script generates **CHANGELOG locally**; CI builds artifacts and publishes the reviewed notes.

## Prepare and create the release PR

Install `git`, authenticated `gh` and `git-cliff`. Run from the repository root on `develop`, with a clean tree matching `origin/develop`:

```bash
fvm dart tool/release.dart --bump patch  # also accepts minor, major or an explicit X.Y.Z
```

The script:

1. creates `release/X.Y.Z`, updates `mobile/pubspec.yaml` and increments its build number;
2. uses git-cliff to prepend the new section to `CHANGELOG.md`, then pauses for local review;
3. commits and pushes, and opens a `chore(release): X.Y.Z` PR into `develop`;
4. dispatches **both** `build.yml` (Android) and `ios-release.yml` (TestFlight) from that branch.

`build.yml` reads the version from pubspec and the notes from the matching CHANGELOG section, then creates a **draft GitHub release** without a tag. Wait for the artifacts and review them before merging. Merging the release PR triggers `publish-release.yml`: it publishes the draft, creates the tag at the PR's merge commit (the squash commit when squash-merging), and notifies Telegram. App Store review is a separate manual step.

## Android artifacts

The release build runs from `mobile/`:

```bash
flutter build apk --flavor production --release --target-platform android-arm64 --obfuscate --split-debug-info=splitMap
```

CI uses Java 21, Flutter from `.fvmrc`, Node 24, NDK r28c and `cargo-about` 0.9.2. Signing requires `ANDROID_KJS` (base64 keystore), `ANDROID_STORE_PASSWORD` and `ANDROID_KEY_PASSWORD` repository secrets. The uploaded release artifact is `moodiary-X.Y.Z-android-arm64.apk`.

## iOS: TestFlight and App Store review

`ios-release.yml` runs `bundle exec fastlane beta` from `mobile/ios` on Xcode 27.1. It signs, archives and uploads to TestFlight, waits for processing, and uses the CHANGELOG section for TestFlight notes. The build number is the greater of pubspec's number and the latest TestFlight number for that version plus one; use the **actual TestFlight build number** when submitting.

Required repository secrets:

- `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8` (base64 `.p8`);
- `IOS_DIST_CERT_P12` (base64 distribution `.p12`), `IOS_DIST_CERT_PASSWORD`.

After testing:

1. Update `mobile/ios/fastlane/metadata/{zh-Hans,en-US}/release_notes.txt` with significant user-facing changes. The committed defaults only say that known issues were fixed; App Store notes are separate from CHANGELOG / TestFlight notes.
2. Manually dispatch `ios-submit.yml` at the ref containing the intended version and metadata, supplying `build_number`. Its `app-store` environment gates submission. For the first version, use `skip_metadata: true` and complete the first submission by hand.
3. The submit lane reuses the uploaded binary and submits it for review with `automatic_release: false`; release it manually after approval. Restore the generic release-note defaults after submission.

New iOS native frameworks also need privacy-manifest coverage: check `mobile/ios/scripts/embed_framework_privacy_manifests.sh` and `mobile/ios/PrivacyManifests/` (`fast*` frameworks use `rust.xcprivacy`).

## Commit messages and CHANGELOG exclusions

Use Conventional Commits prefixes (`feat:`, `fix:`, `chore:`). The local release script uses them for CHANGELOG; CI labels PRs from their titles.

To exclude a change, put `Changelog: skip` in the squashed commit body or use a skipped scope (`chore(deps)`, `chore(readme)`, `chore(pr)`, `chore(pull)`). Release commits (`chore(release)`) are skipped automatically. See `cliff.toml` for the exact rules.
