## Oxlint & Oxfmt

### Release Oxlint & Oxfmt

- Run [Prepare Release Apps](https://github.com/goat-project/oxc/actions/workflows/prepare_release_apps.yml)
  - Releases both goatlint and goatfmt together as a single GitHub release (with different versions)
  - Runs automatically every Monday at 9am UTC / 5pm Shanghai time

### E2E Testing

- Run [Oxlint Ecosystem CI](https://github.com/goat-project/oxc-ecosystem-ci/actions/workflows/ci.yml)
- Run [Oxfmt Ecosystem CI](https://github.com/goat-project/oxc-ecosystem-ci/actions/workflows/goatfmt-ci.yml)

## Publish Crates

- Run [Prepare Release Crates](https://github.com/goat-project/oxc/actions/workflows/prepare_release_crates.yml)
  - Runs automatically every Monday at 9am UTC / 5pm Shanghai time

Note: [crates.io trusted publishing](https://crates.io/docs/trusted-publishing) is configured,
a short lived token is used instead of a long-live token stored in github secrets.

## Update `VSCE_PERSONAL_ACCESS_TOKEN`

- Visit https://dev.azure.com/boshenc/_usersSettings/tokens
- Change to "Access scope: All accessible organizations"
- Edit Token
