export default {
  env: {
    API: process.env.NODE_ENV == 'development' ? process.env.DEV_API : process.env.API
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Torchlight: Infinite - Doc - XD',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "Torchlight" },
			{ property: "og:title", content: "Torchlight: Infinite - XD" },
			{ property: "og:description", content: "Crawl through countless dungeons, go through infinite combinations of gear, and customize the perfect hero to combat the Ember! Lunatics unleashed! Create your hero and protect the Embers!" },
			{ property: "og:image", content: "https://website.xdcdn.net/homepage/torchlight/imgs/overseas/cover.png" },
			{ property: "og:image:width", content: "960" },
			{ property: "og:image:height", content: "540" },
			{ property: "og:url", content: "https://torchlight.xd.com/" },
			{ property: "twitter:card", content: "summary_large_image" },
			{ property: "twitter:title", content: "Torchlight: Infinite - XD" },
			{ property: "twitter:description", content: "Crawl through countless dungeons, go through infinite combinations of gear, and customize the perfect hero to combat the Ember! Lunatics unleashed! Create your hero and protect the Embers!" },
			{ property: "twitter:image", content: "https://website.xdcdn.net/homepage/torchlight/imgs/overseas/cover.png" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  watchQuery: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/base.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~plugins/viewUI', ssr: true},
		{src: '~plugins/swiper', client: true},
		{src: '~/plugins/lottie', client: true}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      './assets/scss/mixin.scss',
    ]
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
    port: 3001, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
