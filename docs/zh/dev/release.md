# 发布流程

发布脚本在**本地生成 CHANGELOG**，CI 负责构建产物并发布已审阅的说明。

## 准备与创建发布 PR

安装 `git`、已登录的 `gh` 和 `git-cliff`。在仓库根目录、`develop` 分支运行，工作区需干净且与 `origin/develop` 一致：

```bash
fvm dart tool/release.dart --bump patch  # 也支持 minor、major 或显式 X.Y.Z
```

脚本会：

1. 创建 `release/X.Y.Z`，更新 `mobile/pubspec.yaml` 并递增构建号；
2. 用 git-cliff 将新段落前置到 `CHANGELOG.md`，暂停供本地审阅；
3. 提交、推送，并创建目标为 `develop` 的 `chore(release): X.Y.Z` PR；
4. 从该分支**同时触发** `build.yml`（Android）与 `ios-release.yml`（TestFlight）。

`build.yml` 从 pubspec 读取版本、从 CHANGELOG 对应段落读取说明，创建**没有 tag 的 GitHub draft release**。等待并审阅产物后再合并；合并发布 PR 会触发 `publish-release.yml`，将草稿转正、在 PR 合并提交上创建 tag（压缩合并时即 squash 提交），并通知 Telegram。App Store 送审是单独的手动步骤。

## Android 产物

发布构建在 `mobile/` 中执行：

```bash
flutter build apk --flavor production --release --target-platform android-arm64 --obfuscate --split-debug-info=splitMap
```

CI 使用 Java 21、`.fvmrc` 指定的 Flutter、Node 24、NDK r28c 和 `cargo-about` 0.9.2。签名需要仓库 secrets：`ANDROID_KJS`（base64 密钥库）、`ANDROID_STORE_PASSWORD`、`ANDROID_KEY_PASSWORD`。发布附件为 `moodiary-X.Y.Z-android-arm64.apk`。

## iOS：TestFlight 与 App Store 送审

`ios-release.yml` 在 Xcode 27.1 上，从 `mobile/ios` 执行 `bundle exec fastlane beta`，签名、归档、上传 TestFlight 并等待处理完成，TestFlight 说明取自 CHANGELOG 对应段落。构建号取 pubspec 构建号与该版本最新 TestFlight 构建号加一的较大值；送审时使用**实际 TestFlight 构建号**。

需要配置的仓库 secrets：

- `ASC_KEY_ID`、`ASC_ISSUER_ID`、`ASC_KEY_P8`（base64 `.p8`）；
- `IOS_DIST_CERT_P12`（base64 发行证书 `.p12`）、`IOS_DIST_CERT_PASSWORD`。

测试通过后：

1. 在 `mobile/ios/fastlane/metadata/{zh-Hans,en-US}/release_notes.txt` 填写面向用户的重要变更。仓库默认文案只有“修复已知问题”；App Store 说明与 CHANGELOG / TestFlight 说明独立。
2. 在包含目标版本与元数据的 ref 上手动触发 `ios-submit.yml`，填写 `build_number`；`app-store` 环境控制送审审批。首个版本使用 `skip_metadata: true` 并手动完成首次提交。
3. submit lane 复用已上传的二进制并送审，`automatic_release: false`，审核通过后需手动发布；提交后恢复通用发布说明默认值。

新增 iOS 原生 framework 时也需覆盖隐私清单：检查 `mobile/ios/scripts/embed_framework_privacy_manifests.sh` 与 `mobile/ios/PrivacyManifests/`（`fast*` framework 使用 `rust.xcprivacy`）。

## 提交信息与 CHANGELOG 排除规则

使用 Conventional Commits 前缀（`feat:`、`fix:`、`chore:`）。本地发布脚本据此生成 CHANGELOG；CI 根据 PR 标题打标签。

若要排除某项变更，在压缩提交正文中写 `Changelog: skip`，或使用会跳过的 scope（`chore(deps)`、`chore(readme)`、`chore(pr)`、`chore(pull)`）。发布提交（`chore(release)`）自动跳过；精确规则见 `cliff.toml`。
