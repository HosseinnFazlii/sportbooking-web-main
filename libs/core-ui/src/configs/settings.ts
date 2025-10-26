// libs/core-ui/src/configs/settings.ts
export const settingsConfig = {
    version: '1404.06.01',
    apiHost: process.env.API_HOST || "/api/",
    name:"courtic",
    defaultLanguage: 'fa',
    supportedLanguages: ['en', 'fa'] as const
}
