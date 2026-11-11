# Service configuration overview

Writing and browsing work offline. Configure weather, maps, AI, and model downloads under **Settings → Services**; configure sync under **Me → Sync and backup**.

| Service | Purpose | Required |
| --- | --- | --- |
| [QWeather](./weather) | Auto-records the weather when you write an entry | Optional |
| [Tianditu](./map) | Place management and a footprint map | Optional |
| [WebDAV](./webdav) | Sync and back up via a cloud drive | Optional |
| [S3 / MinIO](./s3) | Sync and back up via object storage | Optional |
| [LAN sync](./lan) | Direct peer-to-peer sync on the same network | No setup needed |
| [AI models](./ai) | Providers powering AI assistant chat | Required for chat; self-hosted Ollama works |

::: tip Privacy
Requests go directly from the app to the provider. Keys are kept in system secure storage and sent to the relevant service for authentication; they are excluded from [backups](../guide/export-import#backup) and sync data.
:::

## General steps

1. Open the relevant guide above to obtain the provider's address and credentials.
2. Enter them on the matching service or sync page.
3. Return to the feature and verify it works.

If model downloads fail, check the [Hugging Face download source](./ai#model-download-source).
