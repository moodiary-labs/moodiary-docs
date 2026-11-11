# Repository structure and layers

Moodiary is a **layered pub workspace monorepo**: the `pubspec.yaml` at the root only coordinates the workspace and Melos, the app itself lives in `mobile/`, and the shared code sits under `packages/`, split into four layers along the direction of dependency.

## Top-level structure

```
moodiary/
├── tool/          # task runner, layer check, release scripts
├── mobile/        # Flutter app (pub name moodiary_mobile, Android + iOS)
│   └── lib/
│       ├── app/   # composition layer: DI, routing, shell, lifecycle, settings
│       └── main.dart
├── packages/
│   ├── foundation/    # layer 1: shared primitives and native libraries
│   ├── core/          # layer 2: domain-agnostic infrastructure
│   ├── feature_base/  # layer 3: reusable domain foundations
│   └── feature/       # layer 4: feature modules, independent of one another
└── pubspec.yaml       # workspace + Melos config, no app code
```

## The four dependency layers

Dependencies flow strictly in one direction: `foundation → core → feature_base → feature → apps`.

### foundation

Most packages here have no internal dependencies; the six `fast_*` packages use the shared `rust_hook` build package.

| Package | Responsibility |
| --- | --- |
| `moodiary_lint` | Shared analyzer rules |
| `moodiary_di` | The single global get_it instance |
| `moodiary_logging` | Logging; the disk path is injected by the composition root |
| `moodiary_i18n` | slang-based copy and the lookup entry point |
| `moodiary_router` | Typed routing primitives on top of go_router |
| `mui` | The design system, complementing Material |
| `moodiary_utils` | Pure helper functions and content conversion |
| `fast_core` | HTTP client/server, WebDAV/S3 sync, LLM, graph layout |
| `fast_image` | Image pipeline (thumbnails, region decoding, tiled viewing) |
| `fast_press` | Typeset export to PDF / DOCX |
| `fast_tokenizer` | Tokenization with jieba + HF tokenizer |
| `fast_crypto` | AES-GCM + Argon2id |
| `fast_zip` | Compression and extraction (with per-entry AES) |
| `moodiary_native` | Pigeon APIs for the app's Kotlin / Swift integrations |
| `rust_hook` | Shared build hooks for the six Rust packages |

### core

Domain-agnostic infrastructure: `moodiary_platform` (directories, biometrics, network status), `moodiary_http`, `moodiary_storage` (KV and secure KV), `moodiary_files` (file layout and the media pipeline) and `moodiary_theme` (color schemes, fonts, `ThemeData`).

**core knows nothing about domain types** — `Diary`, `Category` and `Font` do not exist at this layer.

### feature_base

`moodiary_models` (Freezed models and DTOs), `moodiary_data` (drift database, repositories, controllers), `moodiary_components`, `moodiary_migration` (one-off migrations from older versions), `moodiary_preferences`, `moodiary_ml` (on-device ML), `moodiary_picker` (media picking) and `moodiary_editor` (the TipTap editor).

### feature

Feature packages that **never reference each other**: `moodiary_diary`, `moodiary_sync`, `moodiary_export`, `moodiary_assistant`, `moodiary_media` and `moodiary_lock`.

Anything that combines features belongs in `mobile/lib/app`.

## How the layering is enforced

pub can only guarantee that there are no cycles, not that dependencies point the right way. `tool/check_layers.dart` performs a static check against the baseline in `tool/layer_baseline.txt` and rejects:

- a lower layer depending on a higher one;
- same-layer dependencies outside the allowed core / feature_base order and the shared Rust hook;
- product code importing `material` directly (it has to go through `package:mui/mui.dart`).

CI runs this check in the Dart job when the PR paths affect it.

## App composition and native code

`mobile/lib` contains `app/`, generated assets in `gen/`, and `main.dart`. Shared domain and feature code lives in `packages/`. The composition root wires get_it / injectable services and routes; Riverpod manages UI state.

Custom Kotlin / Swift integrations belong in `moodiary_native` and use Pigeon. `fast_core` exposes separate HTTP, sync, LLM and graph facades; their owners are defined in `tool/check_layers.dart`. The database uses external `sqlite3_simple` and `sqlite3_vec` packages for full-text and vector search.

## Deciding where code goes

- **Features never reference each other.** If two of them need the same logic, push it down a layer.
- Logic that combines features goes into `mobile/lib/app`.
- When you add a third-party dependency, add it to the package in the layer it belongs to rather than to `mobile/`.
