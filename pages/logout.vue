<template>
  <div>Logging out, Redirecting to home page..</div>
</template>

<script>
export default {
  // middleware: 'auth',
  mounted() {
    this.logout()
  },
  methods: {
    async logout() {
      await this.$strapi.logout()
      this.$strapi.setUser(null)
      // clear sessionStorage
      localStorage.removeItem('adminJwtToken')
      localStorage.removeItem('adminUserInfo')
      localStorage.removeItem('url')
      sessionStorage.removeItem('strapi_jwt')
      document.cookie =
        'strapi.sid.sig=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      document.cookie = 'strapi.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      document.cookie = 'strapi_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      setTimeout(() => {
        this.$router.push('/')
      }, 400)
    },
  },
}
</script>
