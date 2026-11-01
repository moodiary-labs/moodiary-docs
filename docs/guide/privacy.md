# Security and privacy

Moodiary's principle is simple: **your data stays on your device, and your keys never leave it**.

## App lock

Under **Settings → App Lock** you can set a passcode lock:

- The passcode is stored after Argon2id key derivation — even the app can't recover the plaintext;
- Biometric unlock (fingerprint / Face ID) is supported for quick access;
- "Lock immediately" locks the app the moment you switch away;
- "Privacy blur" hides diary content in the app switcher.

## Data storage

- All entries, media, and settings are stored in a **SQLite** database in the app's private directory;
- The app goes online only for features that need it, such as third-party services and model downloads. See the [Privacy Policy](../privacy-policy);
- No ad SDK, no analytics SDK, no crash reporting.

## Sync encryption

When using WebDAV, S3, or LAN sync, you can enable [end-to-end encryption](./sync#end-to-end-encryption):

- Keys are derived locally from your sync password (Argon2id);
- Data is encrypted with AES-GCM before it's uploaded;
- Your provider only sees ciphertext.

## Sensitive information

Third-party API keys (weather, maps, AI) are stored in the system's secure storage and never appear in [backups](./export-import#backup) or sync data — they need to be re-entered after switching devices.

## Uninstalling destroys everything

Uninstalling the app deletes all local data. So before uninstalling, be sure to [export](./export-import) or confirm your cloud already holds a complete sync.
