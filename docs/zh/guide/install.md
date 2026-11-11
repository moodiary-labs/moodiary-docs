# 安装与更新

## 支持的平台

| 平台 | 状态 | 获取方式 |
| --- | --- | --- |
| Android | 已发布 | 从 [GitHub Releases](https://github.com/ZhuJHua/moodiary/releases/latest) 下载 APK |
| iOS | 已发布 | 从 [App Store](https://apps.apple.com/app/id6740092321) 下载 |
| Windows / macOS / Linux | 🚧 重构中 | 敬请期待 |

::: tip 系统要求
Android 需要 **9.0（API 28）** 及以上；iOS 需要 **16.0** 及以上。
:::

## 安装 Android 版

1. 打开 [Releases](https://github.com/ZhuJHua/moodiary/releases) 页面；
2. 在最新版本下找到 `apk` 附件并下载；
3. 安装时若系统提示「未知来源应用」，允许安装即可。

安装包仅面向 `arm64-v8a` 设备，即近几年的绝大多数手机与平板。

## 安装 iOS 版

打开 [Moodiary 的 App Store 页面](https://apps.apple.com/app/id6740092321)，下载安装即可。

## 更新

- **Android**：在**设置 → 关于 → 检查更新**中查看新版本，或从 GitHub Releases 下载最新 APK 覆盖安装。
- **iOS**：通过 App Store 更新，自动更新由 App Store 设置控制。

::: warning 更新前
更新前建议保留一份[备份](./export-import#备份)，无需卸载应用。
:::

## 数据在哪里

日记与元数据保存在本地 SQLite 数据库中，媒体文件单独保存在应用私有目录内。卸载应用会**删除本地日记与媒体文件**，因此：

- 换机或重装前，请先[导出](./export-import)或[同步](./sync)你的数据；
- 应用无法读取其它应用目录，系统「清除存储数据」同样会清空日记。
