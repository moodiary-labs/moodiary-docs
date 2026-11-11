# 代码生成

生成的源文件会提交到仓库。修改输入后，请重新生成并一起提交。以下命令均在仓库根目录执行。

## Dart 代码生成（build_runner）

```bash
fvm dart tool/task.dart build-runner
```

依次在所有依赖 `build_runner` 的 workspace 包中执行生成，然后运行 `dart format .`。修改 injectable 绑定、Freezed 模型、JSON 序列化或 drift 表后执行；只跑 `mobile/` 会漏掉包内输入。

## Rust FFI 绑定（flutter_rust_bridge）

```bash
cargo install flutter_rust_bridge_codegen --version 2.13.0 --locked
fvm dart tool/task.dart gen-rust
```

修改原生包的 `rust/src/api` 后执行。任务先校验 CLI 与 FRB 钉定版本一致，再生成全部六个包的绑定，执行 `cargo fmt` 并分析生成的 Dart 绑定。

## 国际化（slang）

```bash
fvm dart tool/task.dart i18n
```

修改应用源文件 `i18n/flutter/*.i18n.json` 或 mui 的 `lib/src/i18n/*.i18n.json` 后执行。应用输出位于 `moodiary_i18n`。编辑器翻译 `i18n/web/{zh,en}.json` 直接打包，不需要 slang 生成。CI 不检查 slang 产物是否最新。

## 平台绑定（Pigeon）

```bash
fvm dart tool/task.dart pigeon
```

修改 `packages/foundation/moodiary_native/pigeons/*.dart` 后执行，重新生成 Dart 及配置的平台 Kotlin / Swift 绑定。

## 数据库迁移（drift）

```bash
fvm dart tool/task.dart migrations
fvm dart tool/task.dart build-runner
```

修改 `.drift` 表后，若当前 schema 版本已发布则递增 `schemaVersion`，否则更新尚未发布的步骤。`migrations` 生成 schema 快照与步骤辅助代码；实现迁移步骤后再跑 `build-runner`，提交生成的 schema 文件，并验证 `packages/feature_base/moodiary_data/test/db_migration_test.dart`。细节见 `packages/feature_base/moodiary_data/AGENTS.md`。

## 组合生成

```bash
fvm dart tool/task.dart gen  # gen-rust + i18n + pigeon
```

`build-runner` 与 `migrations` 仍需单独执行。

## 一致性检查与构建钩子

`tool/check_generated.dart` 在 `analyze` 与 CI 中运行，检查 FRB 版本、两侧绑定 hash、共享 crate 钉定版本，以及各原生包的工具链 channel、FRB / ffigen 版本；并不要求每个 crate 的 `Cargo.toml` 完全相同。

原生库通过 **Native Assets build hooks** 编译，缓存位于 `.dart_tool/hooks_runner/`。若 `flutter clean` 后构建仍陈旧，可运行 `fvm dart tool/task.dart clean` 清理该缓存与编辑器资源。

编辑器与许可证清单钩子跳过宿主目标构建；Rust 钩子仍会为宿主编译，CI 的 Dart job 通过 `hooks.user_defines.<pkg>.build_assets: false` 禁用它们。Dart 测试不加载这些 Rust 库，但需要 `sqlite3_simple`、`sqlite3_vec` 与 `flutter_js` 的宿主 code assets。
