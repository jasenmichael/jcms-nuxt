<template>
  <div class="fixed shadow-md z-50 w-full" style="background-color: #fafafa">
    <div
      v-show="loaded"
      class="transition-opacity cursor-pointer fixed pl-4 top-0 text-white text-2xl font-bold flex items-center"
      style="background-color: #00695c; width: 240px; height: 60px"
      @click="reloadIframe()"
    >
      <!-- <a href="/admin"> -->
      <span class="font-medium"> &lt; </span>
      JCMS
      <span class="font-medium"> /&gt; </span>
      <!-- </a> -->
    </div>
    <div class="w-full h-screen">
      <!-- <div class="w-full" style="height: calc(100vh - 24px)"> -->
      <!-- <button @click="logout()">LOGOUT</button> -->
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
export default {
  middleware: 'auth',
  data: () => {
    return {
      loaded: false,
    }
  },
  mounted() {
    this.setStrapiInfo()
  },
  methods: {
    logout() {
      this.$strapi.logout()
      this.$router.push('/')
      document
        .getElementById('admin')
        .contentWindow.postMessage(
          JSON.stringify({ ...this.getStrapiInfo(), method: 'login' }),
          '*'
        )
    },
    getStrapiInfo() {
      // get the local versions set durin login
      const adminJwtToken = JSON.parse(sessionStorage.getItem('adminJwtToken'))
      const adminUserInfo = JSON.parse(sessionStorage.getItem('adminUserInfo'))
      const url = window.location.href
      // eslint-disable-next-line no-console
      // console.log(url)
      return { adminJwtToken, adminUserInfo, url }
    },
    setStrapiInfo() {
      if (process.client) {
        const adminIframe = document.getElementById('admin')
        adminIframe.addEventListener('load', () => {
          setTimeout(() => {
            this.loaded = true
          }, 1350)
          adminIframe.contentWindow.postMessage(
            JSON.stringify({ ...this.getStrapiInfo(), method: 'login' }),
            '*'
          )
        })
      }
    },
    reloadIframe(id) {
      // eslint-disable-next-line no-console
      console.log('rerouting to /admin')
      if (process.client) {
        document
          .getElementById('admin')
          .contentWindow.postMessage(
            JSON.stringify({ path: '/', method: 'changeRoute' }),
            '*'
          )
        // document.getElementById(id).src = document.getElementById(id).src
      }
    },
  },
}
</script>
