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
    logout() {
      this.$strapi.logout()
      // clear sessionStorage
      localStorage.removeItem('adminJwtToken')
      localStorage.removeItem('adminUserInfo')
      localStorage.removeItem('url')
      this.$router.push('/')
    },
  },
}
</script>
