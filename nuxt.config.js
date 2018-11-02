const { BASE_URL, API_URL } = require('./config/index')

module.exports = {
  analyze: true,
  /*
  ** Headers of the page
  */
 generate:{
  routes: [
    '/',
    '/home/videos/',

  ]
 },
 cache: {
  max: 1000,
  maxAge: 900000
},

 dev: (process.env.NODE_ENV !== 'production'),
 env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3002',
    API_URL: API_URL,
    WTAT_THIS_APP:"humorboom"
  },
  head: {
    title: 'HumorBoom',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'video' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
 css:[
   "./assets/css/global_css.css"
 ],
 proxy: {
  '/api': {
      target: 'http://humorboom.com/backend/api/',
      pathRewrite: {
          '^/api': '/'
      }
  }
},
axios: {
  proxy: true,
  retry: { retries: 2 },
  debug: false
},
 vendor: [
  'axios',
  "element-ui"
],
modules: [
  '@nuxtjs/axios'
],
plugins:[
  {src:  '~/plugins/element_ui.js',ssr:true},
  { src: '~plugins/axios.js', ssr: true },
  { src: '~plugins/i18n.js' },
  { src: '~plugins/vue-video-player.js',ssr:false},
  // { src: '~plugins/axios.js', ssr: true },
],
  build: {
    vendor: ['axios'],
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')()
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

