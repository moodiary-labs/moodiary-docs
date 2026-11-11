# AI models

The AI assistant can connect to any **OpenAI-compatible** or **Anthropic-compatible** service — official APIs, various aggregator gateways, and locally deployed inference services (such as Ollama and LM Studio).

## Supported protocols

| Protocol | Use case |
| --- | --- |
| OpenAI Chat Completions | Most compatible services |
| OpenAI Responses | OpenAI's newer API |
| Anthropic Messages | The Claude family and compatible gateways |

## Get your config

- **Official services**: create an API key in the console of platforms like OpenAI or Anthropic.
- **Aggregator gateways**: get the Base URL and key from the gateway's docs.
- **Local services**: enable the API service in Ollama / LM Studio. When it runs on your computer, use the computer's LAN address on your phone, for example `http://192.168.1.10:11434/v1`. `127.0.0.1` refers to the phone itself.

## Configure in Moodiary

Go to **Settings → AI assistant → Model Providers** and add a provider:

| Field | Description |
| --- | --- |
| Name | Free-form, used to tell providers apart |
| Protocol | One of the three above |
| Base URL | Locked for presets; fill in manually for self-hosted |
| API Key | The key provided by the service |
| Default model | The model used in conversations |
| Model list | Add manually or pull from the provider |

You can also toggle capability switches for the provider:

- **Tool call**: lets the assistant search and act on your diary.
- **Reasoning**: enables the reasoning options supported by the selected model.
- **Attachments** (vision): allows sending images.

::: tip Presets
The app ships with presets for common providers (from the public directory at [models.dev](https://models.dev/), cached for 24 hours). After picking a preset, you only need to enter the API key.
:::

## Prefer to stay offline?

Chat is handled by your configured provider. You can also self-host Ollama or LM Studio to send content to your own service (see "Local services" above).

Separately, [semantic search](../guide/organize#semantic-search) uses a local embedding model. Download and select it under **Settings → Services → Semantic search**; it then works offline without an API key.

## Model download source

Under **Settings → Services → Hugging Face endpoint**, choose the official source or enter a Hugging Face-compatible base URL. Enter only the root address; the app adds model paths automatically. This controls model downloads, not the chat provider.

## Privacy

Messages, attachments, and diary content retrieved by tools are sent to your configured provider. API keys are kept in system secure storage and sent to that provider for authentication; they are excluded from [backups](../guide/export-import#backup).
