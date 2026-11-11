# Contributing

Moodiary is an open-source project (AGPL-3.0), and contributions of every kind are welcome.

## What you can do

- **Report problems**: file bugs on [GitHub Issues](https://github.com/ZhuJHua/moodiary/issues), and include your device model, OS version, app version and the steps to reproduce.
- **Suggest features**: feature requests go through Issues as well — search first to see whether the discussion already exists.
- **Improve the docs**: this site lives in the [moodiary-docs](https://github.com/ZhuJHua/moodiary-docs) repository, so you can simply open a Pull Request (every page has an "Edit this page on GitHub" link in the bottom-right corner).
- **Translate**: the app uses [slang](https://pub.dev/packages/slang), with app sources in `i18n/flutter` and editor translations in `i18n/web` (mui has its own strings).
- **Write code**: start by reading [Development environment](./setup) and [Coding conventions](./conventions).

## Development workflow at a glance

```
fork / clone → set up the environment → create a branch → build and test → open a Pull Request
```

- Branch off `develop`.
- Give your Pull Request a title in [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style (for example `feat: support EPUB export`).
- CI selects analysis and test jobs by the changed paths; all required checks must pass before merging.

## Pull request checklist

Before you submit, make sure that:

- [ ] `fvm dart tool/task.dart analyze` passes;
- [ ] the relevant tests pass (`fvm dart tool/task.dart test`);
- [ ] anything that touches code generation has been regenerated and committed (see [Code generation](./codegen));
- [ ] new features come with tests or an explanation;
- [ ] user-facing copy goes through i18n instead of being hardcoded.

## Community

- Telegram: <https://t.me/openmoodiary>
- QQ group: 760014526

::: tip Code of conduct
Please stay kind and respectful. Harassment of any kind will be removed, and repeat offenders will be barred from taking part.
:::
