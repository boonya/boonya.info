# boonya.info

## Усього потроху про інтернет та залізяччя

### Build time environment variables

| Name                  | Required | Default      | Description                                      |
| --------------------- | -------- | ------------ | ------------------------------------------------ |
| `BUILD`               | `true`   | `vo value`   | `${{ github.sha }}`                              |
| `ENVIRONMENT`         | `true`   | `vo value`   | `${{ inputs.environment }}` testing              |
| `FARO_COLLECTOR_URL`  | `false`  | `<no value>` | `${{ vars.FARO_COLLECTOR_URL }}`                 |
| `GISCUS_CATEGORY_ID`  | `false`  | `<no value>` | `${{ vars.GISCUS_CATEGORY_ID }}`                 |
| `GISCUS_CATEGORY`     | `false`  | `<no value>` | `${{ vars.GISCUS_CATEGORY }}` Blog               |
| `GISCUS_REPO_ID`      | `false`  | `<no value>` | `${{ vars.REPO_ID }}`                            |
| `GISCUS_REPO`         | `false`  | `<no value>` | `${{ github.repository }}` boonya/boonya.info    |
| `GOOGLE_ANALYTICS_ID` | `false`  | `<no value>` | `${{ vars.GOOGLE_ANALYTICS_ID }}`                |
| `NODE_ENV`            | `false`  | `production` | `development` \| `production`                    |
| `ORIGIN`              | `true`   | `<no value>` | `${{ vars.WEBSITE_ORIGIN }}` https://boonya.info |

### Dev env. vars

| Name       | Required | Default      | Description                   |
| ---------- | -------- | ------------ | ----------------------------- |
| `NODE_ENV` | `false`  | `production` | `development` \| `production` |
| `PORT`     | `false`  | `4321`       |                               |
