<template>
  <div class="max-w-lg flex flex-col mx-auto">
    <div class="px-2 grid grid-rows-1">
      <button v-if="!$strapi.user" @click="login">Login</button>
      <button v-else @click="logout">Logout</button>
      <button v-if="$strapi.user">
        <nuxt-link to="/authenticated" class="inline-block">
          User Profile
        </nuxt-link>
      </button>
      <button>
        <nuxt-link to="/auth"> login/register </nuxt-link>
      </button>
      <button v-if="$strapi.user">
        <nuxt-link to="/admin"> CMS Dashboard </nuxt-link>
      </button>
    </div>
    <pre>{{ $config }}</pre>
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
          // sessionStorage.setItem('adminJwtToken', JSON.stringify(token))
          // sessionStorage.setItem('adminUserInfo', JSON.stringify(user))
          localStorage.setItem('adminJwtToken', JSON.stringify(token))
          localStorage.setItem('adminUserInfo', JSON.stringify(user))
        })
    },
  },
}
</script>

<style>
.selected {
  @apply border-indigo-500 text-indigo-600 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm;
}
.notselected {
  @apply border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm;
}
</style>
