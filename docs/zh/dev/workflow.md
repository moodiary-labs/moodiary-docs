# 常用命令

所有日常操作都通过 `tool/task.dart` 完成，在仓库根目录运行：

```bash
fvm dart tool/task.dart <命令>
```

## 命令一览

| 命令 | 作用 |
| --- | --- |
| `setup` | `flutter pub get` |
| `run` | `flutter run`，额外参数放在 `--` 之后 |
| `build-apk` | 构建 Android APK |
| `build-ios` | 构建 iOS |
| `analyze` | 生成物一致性 + 分层检查 + `flutter analyze` |
| `check-layers` | 只跑分层检查 |
| `test` | 跑受影响的包（见下） |
| `test-mobile` | 只跑 `mobile/` 的测试 |
| `build-runner` | 全 workspace 跑 `build_runner` 并格式化 |
| `gen-rust` | 重新生成 Rust FFI 绑定 |
| `i18n` | 重新生成 slang 文案 |
| `pigeon` | 重新生成 moodiary_native 平台绑定 |
| `migrations` | 生成 drift schema 快照与迁移步骤辅助代码 |
| `gen` | `gen-rust` + `i18n` + `pigeon` |
| `deps` | 输出包依赖图 |
| `clean` | 清理编辑器产物与构建钩子缓存 |

## 运行与构建

```bash
fvm dart tool/task.dart run -- --flavor production  # Android
fvm dart tool/task.dart run                         # iOS；选择 iOS 设备
fvm dart tool/task.dart build-apk                   # 默认 production
fvm dart tool/task.dart build-apk -- --flavor alpha --release
fvm dart tool/task.dart build-ios
```

## 测试

```bash
fvm dart tool/task.dart test                 # 默认：与 origin/develop 共同祖先起的分支改动
fvm dart tool/task.dart test --diff=origin/develop
fvm dart tool/task.dart test --all           # 全仓，CI 用的就是这个
```

- 「受影响」= 相对基准有改动的包 + 它们的传递依赖方；
- 所有选中测试目录在根目录的单个 `flutter test` 进程内运行；共同祖先不可用时回退到 `HEAD`，包含未提交与未跟踪文件；
- 根 `pubspec.yaml` / `pubspec.lock` 改动会选择全仓；
- 旧版数据库迁移测试需要设置 `ISAR_TEST_DYLIB` 指向动态库，构建钩子要求见[测试](./testing)。

::: warning
在仓库根目录直接执行 `flutter test` 找不到任何测试，请始终使用 `task.dart`。
:::

## 代码生成

```bash
fvm dart tool/task.dart build-runner   # injectable / freezed / json_serializable
fvm dart tool/task.dart gen-rust       # 修改 rust/src/api 之后
fvm dart tool/task.dart i18n           # 修改 i18n/flutter 或 mui 文案之后
```

详见[代码生成](./codegen)。

## Rust 侧检查

```bash
for d in packages/foundation/*/rust; do
  (cd "$d" && cargo clippy --all-targets -- -D warnings && cargo test)
done
```

注意遍历 `packages/foundation/*/rust`，按具体包名单跑容易漏掉 `fast_core`。

## 编辑器（WebView）

```bash
cd packages/feature_base/moodiary_editor/editor
corepack pnpm install --frozen-lockfile
corepack pnpm type-check
corepack pnpm test
```

## Melos

`melos bootstrap` 用于激活 workspace 与重建 IDE 模块文件；`melos list`、`melos run <script> --category <layer>` 可按层过滤。日常的代码生成、检查与测试请使用 `task.dart`，它对执行顺序做了保护。
