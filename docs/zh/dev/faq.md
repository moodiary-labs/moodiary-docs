# 常见问题

开发者侧的常见坑。用户侧的问题请到 [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues) 提问。

## 构建 / 运行

### `flutter test` 找不到任何测试

仓库根目录没有测试。请使用 `dart tool/task.dart test`（会分发到各包）与 `test-mobile`。

### 修改 Rust 依赖后 APK 体积没有变化

构建钩子缓存位于 `.dart_tool/hooks_runner/`，`flutter clean` **不会**清理它。执行：

```bash
dart tool/task.dart clean
```

### 构建时报编辑器资源缺失

`moodiary_editor` 的 WebView 资源由构建钩子在首次 run/build 时生成，需要 **corepack** 可用（Node 自带）。确认 `corepack pnpm --version` 可以执行。

### `gen-rust` 拒绝执行

`flutter_rust_bridge_codegen` CLI 版本与 pubspec 钉定版本不一致。安装匹配版本：

```bash
cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
```

### Gradle / Android 构建失败

- 确认 JDK 为 **21**（守护进程 JVM 已被 `gradle-daemon-jvm.properties` 固定）；
- Android SDK 需 API 36 与 NDK 28.2.13676358；
- Gradle 发行版通过腾讯镜像下载，网络受限时可能需要自行配置代理。

### Rust 工具链不对

各原生包的 `rust/rust-toolchain.toml` 钉定 **1.95.0 stable**，`rustup` 会在构建时自动安装。若手动切换过全局工具链，回到仓库目录执行任意 `cargo` 命令即可被覆盖。

## 分层与分析

### `check_layers` 报错

分层检查以 `tool/layer_baseline.txt` 为零基线，常见原因：

- 下层包依赖了上层包；
- 同层包互相引用（core 与 feature_base 有内部顺序）；
- 业务代码直接 `import 'package:flutter/material.dart'`，应改为 `import 'package:mui/mui.dart'`。

### `check_generated` 报错

六个原生包的 `Cargo.toml`、工具链与 FRB / ffigen 版本必须完全一致。通常是有包被单独升级，请对齐或回退。

### analyze 提示某个 i18n 键是死键

文案键被局部别名引用会让 analyzer 误判。请完整写出 `l10n.xxx.yyy`。

## 测试

### 迁移测试被 skip

旧版数据库迁移测试需要动态库路径：

```bash
export ISAR_TEST_DYLIB=/path/to/libisar.dylib
```

### 测试互相影响

依赖 `getIt` 的测试需要在 `tearDown` 中 `getIt.reset`，并在 `setUp` 里注册 fake。

## 其它

### 想加一个新功能包

1. 放进正确的层（见[仓库结构与分层](./architecture)）；
2. 在根 `pubspec.yaml` 的 `workspace` 与 Melos `categories` 中登记；
3. 若它属于 core / feature_base，注意层内顺序是否需要更新。

### 想贡献桌面端

桌面端正在重构中，包的分层已经为它预留，但目前没有可用的桌面 target。欢迎在 Issues 中参与讨论。
