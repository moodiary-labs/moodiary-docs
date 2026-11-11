# LAN sync

LAN sync lets two devices exchange data directly over the **same network**, with nothing going through the cloud.

## How to use

1. Connect both devices to the same Wi-Fi and open Moodiary on each.
2. On the sender, go to **Sync → LAN** and choose **Send**.
3. On the receiver, choose **Receive** and keep the page open.
4. On the sender, select the other device, enter its six-digit pairing code, and start sending.

Discovery uses mDNS; you can also enter the receiver's displayed address manually. No account is needed. Transfer is one-way; reverse the roles to send changes back.

## Transfer security

- Data is packed into entry-level **AES-256**-encrypted archives before transfer.
- A protocol version check rejects incompatible peers. Keep both devices on the same app version.

## Notes

- **Can't find the device**: on iOS, allow local network access in system settings. Check router client isolation, or enter the receiver's address manually.
- **Slow speed**: wireless speed depends on the Wi-Fi standard; 5 GHz networks are noticeably faster.
- **Version differences**: keep both devices on similar versions; before a large cross-version migration, make a [backup](../guide/export-import#backup) first.
