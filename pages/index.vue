<template>
  <div class="max-w-xl flex flex-col mx-auto">
    <!-- <div class="px-2 grid grid-rows-1">
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
    </div> -->
    <!-- <pre>{{ user }}</pre> -->
    <pre>frontendUrl: {{ $config.baseUrl }}</pre>
    <pre>jCmsUrl: {{ $config.strapiUrl }}</pre>
    <hr />
    <p class="text-base font-bold">
      access public endpoints with $strapi.find(endpoint)
    </p>
    <p class="capitalize font-bold">public endpoints:</p>
    <div v-for="(endpoint, i) in endpoints" :key="i">
      <a class="pl-4" :href="endpoint" target="_blank"> > {{ endpoint }}</a>
    </div>
    <hr class="pt-3" />
    <!-- <pre>siteSettings: {{ siteSettings }}</pre> -->
    <p>Login to access private endpoints, and the JCMS Dashboard</p>
  </div>
</template>

<script>
export default {
  async asyncData({ $strapi, $config }) {
    const siteSettings = await $strapi.find('site-settings')
    const endpoints = await $config.contentTypes.map(
      (type) => `${$config.strapiUrl}/${type.endpoint}`
    )
    return { siteSettings, endpoints }
  },
  data: () => {
    return {}
  },
  // computed: {
  //   user() {
  //     return this.$strapi.user
  //   },
  // },
  // methods: {
  //   async login() {
  //     await this.$strapi.login({
  //       identifier: this.email,
  //       password: this.password,
  //     })
  //     this.loginStrapiAdmin()
  //     // this.$router.push('/authenticated')
  //   },
  //   logout() {
  //     this.$strapi.logout()
  //     this.$router.push('/')
  //   },
  //   loginStrapiAdmin() {
  //     fetch(`${this.$config.strapiUrl}/admin/login`, {
  //       credentials: 'omit',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: this.email,
  //         password: this.password,
  //       }),
  //       method: 'POST',
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         const token = res.data.token || null
  //         const user = res.data.user || null
  //         // eslint-disable-next-line no-console
  //         // console.log({
  //         //   token,
  //         //   user,
  //         // })
  //         // sessionStorage.setItem('adminJwtToken', JSON.stringify(token))
  //         // sessionStorage.setItem('adminUserInfo', JSON.stringify(user))
  //         localStorage.setItem('adminJwtToken', JSON.stringify(token))
  //         localStorage.setItem('adminUserInfo', JSON.stringify(user))
  //       })
  //       .catch((err) => {
  //         // eslint-disable-next-line no-console
  //         console.log(err)
  //       })
  //   },
  // },
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
