# Security and privacy

Moodiary works offline and stores your diary locally. Sync, AI, weather, and map features send the data they need to the services you choose.

## App lock

Under **Settings → App Lock** you can set a passcode lock:

- The passcode is stored after Argon2id key derivation — even the app can't recover the plaintext;
- Biometric unlock (fingerprint / Face ID) is supported for quick access;
- "Lock immediately" locks the app the moment you switch away.

You can also enable background privacy in Settings to hide diary content in the app switcher.

## Data storage

- Entries and their metadata are stored in **SQLite**; media are separate files in the app's private directory;
- General settings use a local **MMKV** store; sensitive credentials use the system's secure storage;
- The app goes online only for features that need it, such as third-party services and model downloads. See the [Privacy Policy](../privacy-policy);
- No ad SDK, no analytics SDK, no crash reporting.

In **Settings → Storage**, you can check space usage and remove caches, unused models, or unused media. Review the selected items before cleaning.

## Sync encryption

For WebDAV and S3 sync, you can enable [end-to-end encryption](./sync#end-to-end-encryption):

- Your sync password protects the data encryption key using Argon2id and AES-GCM;
- Data is encrypted with AES-GCM before it's uploaded;
- The cloud stores encrypted content and an encrypted copy of the data key.

LAN transfers use encrypted archives with a pairing code. [Local backups](./export-import#backup) are unencrypted ZIP files.

## Sensitive information

Third-party API keys (weather, maps, AI) are stored in the system's secure storage and sent to the relevant provider to authenticate requests. Moodiary excludes them from [backups](./export-import#backup) and sync data; re-enter them on a new device.

## Before uninstalling

Uninstalling the app can remove your local diary. First [export a backup](./export-import#backup) or confirm that a complete copy is available elsewhere.
