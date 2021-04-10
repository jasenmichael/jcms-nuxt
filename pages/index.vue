<template>
  <div class="grid grid-rows-1">
    <button v-if="!$strapi.user" @click="login">login</button>
    <button v-else @click="logout">logout</button>
    <button>
      <nuxt-link to="/authenticated">authenticated </nuxt-link>
    </button>
    <button><nuxt-link to="/admin">cms </nuxt-link></button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      email: 'admin@jcms.io',
      password: 'Strapi123456',
    }
  },
  computed: {
    user() {
      return this.$strapi.user
    },
  },
  methods: {
    async login() {
      await this.$strapi.login({
        identifier: this.email,
        password: this.password,
      })
      this.loginStrapi()
      // this.$router.push('/authenticated')
    },
    logout() {
      this.$strapi.logout()
      this.res = ''
      this.$router.push('/')
    },
    loginStrapi() {
      // fetch(`http://localhost:1337/admin/login`, {
      fetch(`${this.$config.strapiUrl}/admin/login`, {
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          const token = res.data.token || null
          const user = res.data.user || null
          // eslint-disable-next-line no-console
          console.log({
            token,
            user,
          })
          sessionStorage.setItem('adminJwtToken', JSON.stringify(token))
          sessionStorage.setItem('adminUserInfo', JSON.stringify(user))
        })
    },
  },
}
</script>
