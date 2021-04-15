<template>
  <div class="max-w-2xl flex flex-col mx-auto pt-6">
    <div class="text-lg">
      <span class="font-bold">frontendUrl:</span> {{ $config.baseUrl }}
    </div>
    <div class="text-lg">
      <span class="font-bold"> jCmsUrl:</span> {{ $config.strapiUrl }}
    </div>
    <hr />
    <p class="text-base font-bold">
      Access public endpoints with $strapi.find(endpoint)
      <br />
      or {{ $config.strapiUrl }}/endpoint
    </p>
    <hr />
    <p class="capitalize font-bold">public endpoints:</p>
    <div v-for="(endpoint, i) in endpoints" :key="i">
      <a class="pl-4" :href="$config.strapiUrl + endpoint" target="_blank">
        > {{ endpoint }}</a
      >
    </div>
    <hr class="pt-3" />
    <!-- <pre>siteSettings: {{ siteSettings }}</pre> -->
    <div class="items-center">
      <p>
        <span>
          <nuxt-link to="/auth" class="underline text-blue-800">
            Login
          </nuxt-link>
        </span>
        to access private endpoints, and (if Administrator or Editor) the
        <span>
          <nuxt-link to="/admin" class="underline text-blue-800">
            JCMS Dashboard
          </nuxt-link>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $strapi, $config }) {
    const siteSettings = await $strapi.find('site-settings')
    const endpoints = await $config.contentTypes.map(
      (type) => `/${type.endpoint}`
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
