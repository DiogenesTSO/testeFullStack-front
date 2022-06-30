import colors from 'vuetify/es5/util/colors'
// Envs globais (independentes do ambiente)
let env = {
  gmapsApiKey: 'AIzaSyDuBbklTb5rRo32qRdnmEO4Bg3RCmHG7P8',
  pusherAppKey: 'fcf65e40c89971ef276f',
  pusherAppCluster: 'sa1',
}
let appName = ''
// Ambiente de Produção
if (process.env.NODE_ENV === 'production') {
  appName = 'Imobia Controle-3'
  env = {
    ...env,
    ...{
      domain: '.imobia.app',
      backendUrl: 'https://apicontrole.useimobia.com.br/',
      app3Url: 'https://legado.imobia.app/',
      linkShare: 'http://compartilhamento.imobia.app/',
    },
  }
  // Ambiente de Desenvolvimento
} else if (process.env.NODE_ENV === 'dev') {
  appName = 'ImobiaDev'

  env = {
    ...env,
    ...{
      domain: '.sistemaimobia.com.br',
      backendUrl: 'http://apicontrole.useimobia.com.br/',
      app3Url: 'http://legado.sistemaimobia.com.br/',
      linkShare: 'https://compartilhamento.sistemaimobia.com.br/',
    },
  }
  // Ambiente Local
} else {
  appName = 'Imobia'
  env = {
    ...env,
    ...{
      domain: null,
      backendUrl: 'http://127.0.0.1:8000/',
      // se for abrir com o servidor do imobia antigo, abrir primeiro o servidor novo para manter as portas certas
      app3Url: 'http://localhost:8081/',
      linkShare: 'http://localhost:8080/',
    },
  }
}
export default {
  ssr: false,
  env,
  dev: process.env.NODE_ENV !== 'production',
  server: {
    host: '0.0.0.0',
    port: 8080, // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    titleTemplate: 'Imobia: %s',
    htmlAttrs: {
      lang: 'pt_BR',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    base: '/',
    middleware: 'auth',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/helpers.js',
    '~/plugins/formatters.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', { fix: true }],
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { treeShake: true }],
    // https://github.com/nuxt-community/laravel-echo-module
    // Configuração do pusher
    [
      '@nuxtjs/laravel-echo',
      {
        ssr: false,
        broadcaster: 'pusher',
        key: env.pusherAppKey,
        cluster: env.pusherAppCluster,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/webcore-it/nuxt-clipboard2
    'nuxt-clipboard2',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Aplicando o echo no plugins/echo.js

  pwa: {
    meta: {
      name: 'imobia',
      lang: 'pt-BR',
    },
    manifest: {
      name: appName,
      short_name: appName,
      description: 'Controle Imobia-3',
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true,
      },
      dark: false,
      themes: {
        dark: {
          primary: '#417bff',
          normal: '#eeeeee',
          highlight: '#fff',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          green: colors.green.lighten1,
          background: '#17181a',
          card: '#202123',
          background2: '#17181a',
          background2border: '#17181a',
          sidebarbg: '#202123',
          sidebarcolor: '#d4d4d4',
          imobiaBlue: '#1e3260',
          imobiaOrange: '#FA4616',
          imobiaYellow: '#ffc107',
        },
        light: {
          primary: '#1e3260',
          normal: '#30303f',
          highlight: '#000',
          card: '#ffffff',
          green: colors.green.darken3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          background: '#f0f0f0',
          background2: '#ffffff',
          background2border: '#cecece',
          sidebarbg: '#d4d4d4',
          sidebarcolor: '#fff',
          imobiaBlue: '#1e3260',
          imobiaOrange: '#e94e24',
          imobiaYellow: '#ffc107',
        },
      },
    },
  },
}
