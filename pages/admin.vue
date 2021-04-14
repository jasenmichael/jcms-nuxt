<template>
  <div class="fixed shadow-md z-50 w-full" style="background-color: #fafafa">
    <!-- @click="routeIframe('/')" -->
    <div
      v-show="loaded"
      class="transition-opacity cursor-pointer fixed pl-4 text-white text-2xl font-bold flex items-center"
      style="background-color: #00695c; width: 240px; height: 60px"
      @click="routeIframe('/')"
    >
      <span class="font-medium"> &lt; </span>
      JCMS
      <span class="font-medium"> /&gt; </span>
    </div>

    <div class="w-full" :style="`height: calc(100vh - ${navbarHeight}px)`">
      <iframe
        id="admin"
        ref="admin"
        :src="$config.strapiUrl || 'http://localhost:1337'"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import { routeIframe } from '~/plugins/routeIframe.js'

export default {
  middleware: 'auth',
  props: {
    navbarHeight: {
      type: Number,
      default: 64,
    },
  },
  data: () => {
    return {
      loaded: false,
    }
  },
  // watchQuery(newQuery, oldQuery) {
  //   // Only execute component methods if the old query string contained `bar`
  //   // and the new query string contains `foo`
  //   console.log('OLD', newQuery.q)
  //   console.log('NEW', oldQuery.q)
  //   this.routeIframe(newQuery.q) // .replace(/%2F/g, '/'))
  //   return newQuery.q && oldQuery.q
  // },
  async mounted() {
    // console.log(yo())
    await this.addMessageListener()
    await this.setStrapiInfo()
    if (this.$route.query.q) {
      const iframePath = '/' + this.$route.query.q
      console.log('QUERY_____', iframePath)
      routeIframe(iframePath)
    } else {
      this.routeIframe('/')
    }
  },
  beforeDestroy() {
    this.removeMessageListener()
  },
  methods: {
    addMessageListener() {
      window.addEventListener('message', this.recieveMessage, false)
    },
    removeMessageListener() {
      window.removeEventListener('message', this.recieveMessage)
    },
    recieveMessage(event) {
      console.log('message recieved from iframe')
      const path = event.data.path
      if (path) {
        console.log(path)
        this.routeIframe(path)
        // this.$router.push({ path: '?q=' + path /* .substring(1) */ })
      }
    },
    getStrapiInfo() {
      // get the local versions set durin login
      // const adminJwtToken = JSON.parse(sessionStorage.getItem('adminJwtToken'))
      // const adminUserInfo = JSON.parse(sessionStorage.getItem('adminUserInfo'))
      const adminJwtToken = JSON.parse(localStorage.getItem('adminJwtToken'))
      const adminUserInfo = JSON.parse(localStorage.getItem('adminUserInfo'))
      if (!adminJwtToken || !adminUserInfo) {
        this.$router.push({ path: '/' /*, query: { q: this.q } */ })
      }
      const url = window.location.href
      return { adminJwtToken, adminUserInfo, url }
    },
    setStrapiInfo() {
      if (process.client) {
        const adminIframe = document.getElementById('admin')
        adminIframe.addEventListener('load', () => {
          setTimeout(() => {
            this.loaded = true
          }, 1350)
          //  send strapiInfo to iframe via sendMessage
          adminIframe.contentWindow.postMessage(
            JSON.stringify({ ...this.getStrapiInfo(), method: 'login' }),
            // '*'
            this.$config.strapiUrl
          )
        })
      }
    },
    routeIframe(path) {
      routeIframe(path, this.$config.strapiUrl)
      this.$router.push({ path: '/admin' })
    },
  },
}
</script>
