export default {
  env: {
    API: process.env.NODE_ENV == 'development' ? process.env.DEV_API : process.env.API
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'torchlight_wiki',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/base.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~plugins/viewUI', ssr: true}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true,
    prefix: '/api',
    // baseURL: process.env.API
  },

  proxy: {
    '/api': {
      changeOrigin: true,
      target: 'http://172.26.151.94:15000',
      pathRewrite: {
          "^/api": "/",
      },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'querystring-es3',
      'ansi-regex',
      'strip-ansi'
    ]
  },

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}