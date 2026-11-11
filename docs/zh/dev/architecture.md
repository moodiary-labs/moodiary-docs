# 仓库结构与分层

Moodiary 采用 **分层 pub workspace monorepo**：根目录的 `pubspec.yaml` 只负责协调 workspace 与 Melos，应用本体在 `mobile/`，共享代码在 `packages/` 下按依赖方向分为四层。

## 顶层结构

```
moodiary/
├── tool/          # 任务运行器、分层检查、发布脚本
├── mobile/        # Flutter 应用（pub 名 moodiary_mobile，Android + iOS）
│   └── lib/
│       ├── app/   # 组合层：DI、路由、壳、生命周期、设置
│       └── main.dart
├── packages/
│   ├── foundation/    # 第 1 层：公共原语与原生库
│   ├── core/          # 第 2 层：领域无关的基础设施
│   ├── feature_base/  # 第 3 层：可复用的领域基础
│   └── feature/       # 第 4 层：彼此独立的功能模块
└── pubspec.yaml       # workspace + Melos 配置，没有应用代码
```

## 四个依赖层

依赖方向严格为 `foundation → core → feature_base → feature → apps`：

### foundation

公共原语层，不依赖其它内部包；六个 `fast_*` 包共用 `rust_hook` 构建包是例外。

| 包 | 职责 |
| --- | --- |
| `moodiary_lint` | 共享 analyzer 规则 |
| `moodiary_di` | 全局唯一的 get_it 实例 |
| `moodiary_logging` | 日志；磁盘路径由组合根注入 |
| `moodiary_i18n` | 基于 slang 的文案与查找入口 |
| `moodiary_router` | 基于 go_router 的类型化路由原语 |
| `mui` | 设计系统，Material 的补充 |
| `moodiary_utils` | 纯工具函数与内容转换 |
| `fast_core` | HTTP 客户端/服务端、WebDAV/S3 同步、LLM、图布局 |
| `fast_image` | 图片管线（缩略图、区域解码、平铺查看） |
| `fast_press` | 排版导出为 PDF / DOCX |
| `fast_tokenizer` | jieba + HF tokenizer 分词 |
| `fast_crypto` | AES-GCM + Argon2id |
| `fast_zip` | 压缩与解压（支持条目级 AES） |
| `moodiary_native` | 应用 Kotlin / Swift 集成的 Pigeon API |
| `rust_hook` | 六个 Rust 包共用的构建钩子 |

### core

领域无关的基础设施：`moodiary_platform`（目录/生物识别/网络状态）、`moodiary_http`、`moodiary_storage`（KV 与安全 KV）、`moodiary_files`（文件布局与媒体管线）、`moodiary_theme`（配色、字体、ThemeData）。

**core 不认识任何领域类型**（`Diary`、`Category`、`Font` 都不在这一层）。

### feature_base

`moodiary_models`（Freezed 模型与 DTO）、`moodiary_data`（drift 数据库、仓库、控制器）、`moodiary_components`、`moodiary_migration`（旧版本一次性迁移）、`moodiary_preferences`、`moodiary_ml`（本地 ML）、`moodiary_picker`（媒体选择）、`moodiary_editor`（TipTap 编辑器）。

### feature

彼此**互不引用**的功能包：`moodiary_diary`、`moodiary_sync`、`moodiary_export`、`moodiary_assistant`、`moodiary_media`、`moodiary_lock`。

跨功能组合统一放在 `mobile/lib/app` 中完成。

## 分层是如何强制的

pub 只能保证无环，无法保证方向。`tool/check_layers.dart` 以 `tool/layer_baseline.txt` 为基线做静态检查，会拒绝：

- 下层依赖上层；
- 不符合 core / feature_base 层内顺序或共享 Rust 钩子例外的同层依赖；
- 业务代码直接 import `material`（必须经由 `package:mui/mui.dart`）。

PR 路径影响 Dart job 时，CI 会运行该检查。

## 应用组合与原生代码

`mobile/lib` 包含 `app/`、生成资源 `gen/` 与 `main.dart`。共享领域及功能代码放在 `packages/`；组合根装配 get_it / injectable 服务与路由，Riverpod 管理 UI 状态。

自有 Kotlin / Swift 集成集中在 `moodiary_native`，通过 Pigeon 调用。`fast_core` 分别暴露 HTTP、同步、LLM、图布局门面，归属由 `tool/check_layers.dart` 定义。数据库通过外部 `sqlite3_simple` 与 `sqlite3_vec` 包实现全文和向量检索。

## 放代码的原则

- **feature 之间不互相引用**。需要共享的逻辑下沉一层；
- 跨功能的组合逻辑写进 `mobile/lib/app`；
- 新增第三方依赖时，优先放进它所属的那一层的包，而不是 `mobile/`。
