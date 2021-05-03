/* eslint-disable no-console */
import axios from 'axios'
require('dotenv').config()

async function getContentTypes() {
  return await axios
    .get(`${process.env.STRAPI_URL}/content-types`)
    .then((res) => {
      // console.log(res.data)
      return JSON.parse(JSON.stringify(res.data))
    })
    .catch(function (error) {
      console.log(error)
      return { error }
    })
}

// async function getPublicContent(params) {

// }

export default async () => {
  return {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'jcms-nuxt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      './node_modules/@braid/vue-formulate/themes/snow/snow.scss',
      '~/assets/style.css',
    ],
    generate: {
      fallback: true,
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/stylelint
      '@nuxtjs/stylelint-module',
      // https://go.nuxtjs.dev/tailwindcss
      '@nuxtjs/tailwindcss',
      // https://vueformulate.com/guide/installation/#nuxt
      '@braid/vue-formulate/nuxt',
      //  https://google-fonts.nuxtjs.org
      '@nuxtjs/google-fonts',
    ],
    googleFonts: {
      families: {
        Roboto: true,
        'Josefin+Sans': true,
        Lato: [100, 300],
        Raleway: {
          wght: [100, 400],
          ital: [100],
        },
        'Montserrat+Alternates': {
          ital: [500, 600, 700, 800],
          wght: [500, 600, 700, 800],
        },
      },
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      // https://go.nuxtjs.dev/pwa
      '@nuxtjs/pwa',
      // https://go.nuxtjs.dev/content
      // '@nuxt/content',
      // https://strapi.nuxtjs.org/setup
      '@nuxtjs/strapi',
      // '@nuxtjs/proxy',
    ],
    // proxy: {
    //   '/api': {
    //     target: process.env.STRAPI_URL || 'http://localhost:1337',
    //     pathRewrite: {
    //       '^/api': '/',
    //     },
    //   },
    // },
    // strapi: {
    //   url: '/api',
    // },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
      manifest: {
        lang: 'en',
      },
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    publicRuntimeConfig: {
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      isDev: process.env.NODE_ENV === 'development',
      contentTypes: await getContentTypes(),
    },
  }
}
