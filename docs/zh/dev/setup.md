# 开发环境

Moodiary 是一个 **Flutter + Rust** monorepo。以下命令均在仓库根目录执行。

## 需要安装的工具

| 工具 | 版本 | 说明 |
| --- | --- | --- |
| [FVM](https://fvm.app/) | 未钉定 | 按 `.fvmrc` 选择 SDK |
| Flutter / Dart | **3.47.8 / 3.13.0** | `.fvmrc` 钉定 Flutter；pubspec 中的 SDK 约束只是下限 |
| Rust | **1.99.1 stable** | 需要 `rustup`；各原生包在 `rust/rust-toolchain.toml` 中钉定 |
| Node.js + corepack | CI 使用 **24**；编辑器声明 `^20.19.0` 或 `>=22.12.0` | corepack 必须可用；编辑器在 `package.json` 中钉定 pnpm |
| JDK | **21** | Android 守护进程 JVM 已固定为 21 |
| Android SDK | API 36，NDK 28.2.13676358 | 应用面向 arm64、Android API 28 及以上 |
| Xcode | CI 使用 **27.1** | iOS 部署目标为 **16.0**；iOS 开发需要 macOS |
| [melos](https://pub.dev/packages/melos) | **8.6.0** | 根 `pubspec.yaml` 钉定；CLI 必须在 `PATH` 中 |
| [cargo-about](https://github.com/EmbarkStudios/cargo-about) | **0.9.2** | 构建时生成第三方许可证清单 |

在某个包的 `rust/` 目录运行 Cargo 时，rustup 会选择钉定的工具链；仓库根目录没有 Rust 工具链文件。

## 初始化

```bash
git clone https://github.com/ZhuJHua/moodiary.git
cd moodiary

fvm use
fvm dart pub global activate melos 8.6.0
fvm dart tool/task.dart setup  # flutter pub get
melos bootstrap              # 激活 workspace、生成 IDE 模块文件；不跑代码生成
cargo install cargo-about --version 0.9.2 --locked
```

编辑器 WebView 资源由构建钩子在 run/build 时生成。在 `packages/feature_base/moodiary_editor/editor` 中确认 `corepack pnpm --version` 可用；若缺少 corepack，可运行 `npm install -g corepack` 安装。

## 验证环境

```bash
fvm dart tool/task.dart analyze   # 生成绑定一致性 + 分层检查 + flutter analyze
fvm dart tool/task.dart test      # 受影响的包；--all 跑全仓
```

Rust、编辑器检查及可选的旧版迁移测试动态库见[测试](./testing)。

## 运行

```bash
fvm dart tool/task.dart run -- --flavor production  # Android
fvm dart tool/task.dart run                         # iOS；选择 iOS 设备
fvm dart tool/task.dart run -- --flavor alpha --release
```

额外 Flutter 参数放在 `--` 后。应用支持 **Android**（`build-apk`，默认 production flavor）和 **iOS**（`build-ios`）两个目标。

## 下一步

- [仓库结构与分层](./architecture)：理解代码组织；
- [常用命令](./workflow)：日常开发命令；
- [常见问题](./faq)：构建失败时先看这里。
