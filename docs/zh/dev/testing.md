# 测试

Moodiary 有 Dart、Rust 与编辑器三套测试。`.github/workflows/quality.yml` 按 PR 路径选择 CI job；手动触发时运行全部三项。

## Dart

```bash
fvm dart tool/task.dart test          # 受影响的包
fvm dart tool/task.dart test --all    # 全仓
fvm dart tool/task.dart test-mobile   # 仅 mobile/
```

- 默认基准是 `HEAD` 与 `origin/develop` 的共同祖先（不可用时回退到 `HEAD`），可用 `--diff=<ref>` 覆盖。包含未提交与未跟踪文件，以及改动包的传递依赖方；
- 根 `pubspec.yaml` 或 `pubspec.lock` 改动会选择全仓，`--all` 也一样；
- 任务把选中的 `test/` 目录传给**仓库根目录的单个 `flutter test` 进程**，钩子与前端编译器只运行一次；
- 只有旧版数据库迁移测试需要 `ISAR_TEST_DYLIB`。

### 仓库测试的写法

直接构造内存数据库，测试级联行为时开启外键：

```dart
final db = MoodiaryDatabase.forTesting(NativeDatabase.memory());
await db.customStatement('PRAGMA foreign_keys = ON');
addTearDown(db.close);
final repo = DiaryRepository(db);
```

上层测试可在 get_it 中注册 fake：

```dart
setUp(() {
  getIt.registerSingleton<DiaryRepository>(FakeDiaryRepository());
});

tearDown(getIt.reset);
```

测试 cwd 是仓库根目录。读取仓库文件请使用 `package:moodiary_lint/testing.dart` 的 `repoRoot`；临时数据写入各测试独立的 `Directory.systemTemp.createTempSync()` 目录并清理。

## Rust

六个原生包各有自己的 crate，需逐个检查：

```bash
for d in packages/foundation/*/rust; do
  (cd "$d" && cargo clippy --all-targets -- -D warnings && cargo test)
done
```

在单个 crate 中运行 `cargo test --workspace` 不会覆盖其它 crate。

## 编辑器（WebView）

```bash
cd packages/feature_base/moodiary_editor/editor
corepack pnpm install --frozen-lockfile
corepack pnpm type-check
corepack pnpm test
```

## CI 上跑什么

| Job | 内容 |
| --- | --- |
| Dart | `check_generated` → `flutter analyze` → `check_layers` → `task.dart test --all` |
| Rust | 六个原生包的 `cargo clippy --all-targets -- -D warnings` 与 `cargo test` |
| Editor | 按锁文件安装、`pnpm type-check` 与 `pnpm test` |

完整本地验证需要运行 `fvm dart tool/task.dart analyze`、`test --all`，以及上面的 Rust / 编辑器命令。

编辑器与许可证清单钩子跳过宿主目标构建；**Rust 钩子在本地仍为宿主编译**，CI 会在 Dart 测试前禁用六个仓库内 Rust 钩子。Dart 测试不加载这些库，但 `sqlite3_simple`、`sqlite3_vec` 与 `flutter_js` 仍需构建宿主资源；根 pubspec 通过 dev-dependencies 中的 `moodiary_data` 与 `moodiary_assistant` 引入这些钩子。

缺少生成源码时先跑[代码生成](./codegen)。根目录没有 `test/`，直接跑 `flutter test` 需显式传包内测试路径，`task.dart` 会自动提供。
