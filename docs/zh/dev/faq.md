# 常见问题

开发者侧的常见坑。用户侧的问题请到 [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues) 提问。

## 构建 / 运行

### `flutter test` 找不到任何测试

仓库根目录没有测试。请使用 `fvm dart tool/task.dart test`（根目录单个进程，显式传入包内测试路径），或用 `test-mobile` 测试应用。详见[测试](./testing)。

### 修改 Rust 依赖后 APK 体积没有变化

构建钩子缓存位于 `.dart_tool/hooks_runner/`，`flutter clean` **不会**清理它。执行：

```bash
fvm dart tool/task.dart clean
```

### 构建时报编辑器资源缺失

`moodiary_editor` 的 WebView 资源由构建钩子在首次 run/build 时生成，需要 **corepack** 在 `PATH` 中。缺少时运行 `npm install -g corepack`，再到编辑器目录确认 `corepack pnpm --version` 可用。

### `gen-rust` 拒绝执行

`flutter_rust_bridge_codegen` CLI 版本与 pubspec 钉定版本不一致。安装匹配版本：

```bash
cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
```

### Android 要求指定 flavor

使用 `fvm dart tool/task.dart run -- --flavor production`（也可选 `alpha`）。`build-apk` 默认使用 production，但 `run` 不会自动补 flavor。

### Gradle / Android 构建失败

- 确认 JDK 为 **21**（守护进程 JVM 已被 `gradle-daemon-jvm.properties` 固定）；
- Android SDK 需 API 36 与 NDK 28.2.13676358；
- Gradle 发行版通过腾讯镜像下载，网络受限时可能需要自行配置代理。

### Rust 工具链不对

各原生包的 `rust/rust-toolchain.toml` 钉定 **1.99.1 stable**，`rustup` 会在构建时自动安装。需在某个包的 `rust/` 目录执行 Cargo 才会选中该工具链；仓库根目录没有工具链文件。

## 分层与分析

### `check_layers` 报错

分层检查以 `tool/layer_baseline.txt` 为零基线，常见原因：

- 下层包依赖了上层包；
- 不符合 core / feature_base 层内顺序或共享 Rust 钩子例外的同层依赖；
- 业务代码直接 `import 'package:flutter/material.dart'`，应改为 `import 'package:mui/mui.dart'`。

### `check_generated` 报错

各原生包的共享 crate 钉定版本、工具链 channel 与 FRB / ffigen 版本需一致；FRB 两侧绑定也需匹配钉定版本与内容 hash。通常是有包被单独升级，请对齐或回退。

### analyze 提示某个 i18n 键是死键

文案键被局部别名引用会让 analyzer 误判。请完整写出 `l10n.xxx.yyy`。

## 测试

### 迁移测试被 skip

旧版数据库迁移测试需要动态库路径：

```bash
export ISAR_TEST_DYLIB=/path/to/libisar.dylib
```

### 测试互相影响

依赖 `getIt` 的测试需要调用 `tearDown(getIt.reset)`，并在 `setUp` 里注册 fake。

## 其它

### 想加一个新功能包

1. 放进正确的层（见[仓库结构与分层](./architecture)）；
2. 在根 `pubspec.yaml` 的 `workspace` 与 Melos `categories` 中登记；
3. 若它属于 core / feature_base，注意层内顺序是否需要更新。

### 想贡献桌面端

当前仓库只有移动端应用 target，共享包分层为桌面支持留有空间。欢迎在 Issues 中参与讨论。
