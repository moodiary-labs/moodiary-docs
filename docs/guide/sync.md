# Backup and sync

Moodiary supports WebDAV, S3, LAN transfer, and local backups. Cloud sync offers optional end-to-end encryption; LAN transfers use encrypted archives.

Open **Me → Sync and backup** to configure a sync method.

## Sync methods compared

| Method | Best for | Setup needed |
| --- | --- | --- |
| **LAN sync** | Two devices on the same Wi-Fi | No account |
| **WebDAV** | Cloud drives like Jianguoyun, Nextcloud | Server address, account |
| **S3 / MinIO** | Self-hosted object storage, most flexible capacity | Endpoint, keys |

All three methods support **incremental transfer**, syncing entry updates and missing media.

## End-to-end encryption

Once encryption is on, you only set a **sync password**:

- The app derives a key from the password using Argon2id to protect a randomly generated data key; content is encrypted with AES-GCM;
- The key that actually encrypts your data never leaves the device in plaintext;
- Your provider stores encrypted content and an encrypted copy of the data key.

::: warning Your sync password can't be recovered
If you forget your sync password, locked cloud data cannot be decrypted. You can reset the cloud and upload your local data again; resetting deletes the remote copy and keeps local data.
:::

## LAN sync

1. Connect both devices to the same Wi-Fi and open Moodiary on each;
2. On the receiving device, open **Sync → LAN → Receive**;
3. On the sender, choose **Send**, select the discovered device, and enter the receiver's six-digit pairing code.

Transfer is one-way and incremental, using an entry-level AES-256 encrypted archive. No account is needed; see [LAN setup](../services/lan).

::: tip
If the other device can't be found, check whether your router has "AP isolation" (client isolation) enabled.
:::

## WebDAV

Under **Sync → WebDAV**, fill in:

| Field | Notes |
| --- | --- |
| Server address | e.g. `https://dav.jianguoyun.com/dav/` |
| Username | Your cloud account |
| Password | The app password (some providers require a separately generated authorization token) |

For details see [WebDAV configuration](../services/webdav).

## S3 / MinIO

Under **Sync → S3**, fill in the Endpoint, Bucket, Region, Access Key, and Secret Key, and choose whether to use HTTPS. This works with a self-hosted MinIO or any S3-compatible object storage — see [S3 / MinIO configuration](../services/s3).

## Backup

Create a backup under **Me → Import & export** and keep a copy elsewhere. Local backups are unencrypted ZIP files; cloud sync encryption does not protect them. See [Backup contents](./export-import#backup).
