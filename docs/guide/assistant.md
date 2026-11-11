# AI assistant

Chat with a provider you configure and use tools to search or edit your diary.

## Providers and on-device models

### 1. Connect an online service

Any service that speaks one of the following protocols is supported, including the official API and various self-hosted gateways:

- **OpenAI Chat Completions**
- **OpenAI Responses**
- **Anthropic Messages**

Create a provider under **Settings → AI assistant → Model Providers** and fill in the [base URL, API key, and model](../services/ai). Presets are available for common providers.

### 2. On-device models

Semantic search uses a local embedding model. Download and select it under **Settings → Services → Semantic search**, then search by meaning — see [Semantic search](./organize#semantic-search).

After downloading, embedding and search run offline. Automatic mood suggestions were removed in 2.9.0; choose a mood yourself when writing.

::: tip Chat always goes through a provider
Chat and diary tool calls are handled by your configured provider — on-device models don't take part in chat. To keep third-party cloud services out of the loop entirely, self-host an inference service like Ollama or LM Studio; see [AI models](../services/ai).
:::

## What it can do

The assistant can call a set of controlled tools to work with your diary:

- Query and semantically search your diary;
- Create, update, and delete entries and categories;
- Remember preferences you tell it;
- Run JavaScript in a controlled sandbox to process data.

::: warning Tool permissions
The default **Ask before changes** mode confirms writes and deletions. **Auto edit** confirms only destructive actions such as overwriting entry text; **Full access** runs tools without asking. Choose the mode in AI assistant settings or for an individual conversation.
:::

## Privacy

- Chat sends messages, attachments, and diary content retrieved by tools to your configured provider;
- Semantic search computes embeddings and searches on-device;
- A disclaimer is shown on first use, and the assistant stays disabled until you accept it.
