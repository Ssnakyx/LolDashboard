export default defineNuxtConfig({
  compatibilityDate: '2025-07-15', 
  devtools: { enabled: true }, 
  
  modules: [
    '@nuxt/image', 
    '@nuxt/ui', 
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' }
    ],
    defaultLocale: 'fr',
    langDir: 'locales/', 
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})