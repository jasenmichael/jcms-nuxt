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
      sessionStorage.removeItem('adminJwtToken')
      sessionStorage.removeItem('adminUserInfo')
      this.$router.push('/')
    },
  },
}
</script>
