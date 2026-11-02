# 参与贡献

Moodiary 是一个开源项目（AGPL-3.0），欢迎任何形式的参与。

## 我可以做什么

- **反馈问题**：在 [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues) 提交 Bug，请附上设备型号、系统版本、应用版本与复现步骤。
- **提出建议**：功能建议同样走 Issues，先搜索一下是否已有类似讨论。
- **改进文档**：本站文档位于 [moodiary-docs](https://github.com/ZhuJHua/moodiary-docs) 仓库，直接提交 Pull Request 即可（每页右下角有「在 GitHub 上编辑此页」入口）。
- **翻译**：应用文案基于 [slang](https://pub.dev/packages/slang) 管理，翻译文件在 `packages/foundation/moodiary_i18n`。
- **提交代码**：请先阅读 [开发环境](./setup) 与 [编码约定](./conventions)。

## 开发流程概览

```
fork / clone → 搭建环境 → 新建分支 → 开发与自测 → 提交 Pull Request
```

- 分支基于 `develop` 创建；
- Pull Request 请使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 风格的标题（如 `feat: 支持导出为 EPUB`）；
- CI 会自动执行分析、分层检查与测试，全部通过后才可合并。

## Pull Request 检查清单

提交前请确认：

- [ ] `dart tool/task.dart analyze` 通过；
- [ ] 相关测试通过（`dart tool/task.dart test`）；
- [ ] 涉及代码生成的改动已经重新生成并提交（见[代码生成](./codegen)）；
- [ ] 新增功能附带测试或说明；
- [ ] 面向用户的文案已通过 i18n 而非硬编码。

## 社区

- Telegram：<https://t.me/openmoodiary>
- QQ 群：760014526

::: tip 行为准则
请保持友善与尊重。任何形式的骚扰都会被移除，屡犯者将被限制参与。
:::
