<template>
  <div class="max-w-2xl flex flex-col mx-auto pt-6">
    <!-- {{ stuff }} -->
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
    <hr />
    <pre>{{ $strapi.user }}</pre>
  </div>
</template>

<script>
export default {
  // async asyncData({ $strapi, $config }) {
  //   let siteSettings, endpoints
  //   try {
  //     siteSettings = (await $strapi.find('site-settings')) || {}
  //     endpoints = await $config.contentTypes.map((type) => `/${type.endpoint}`)
  //   } catch (error) {
  //     siteSettings = {}
  //     endpoints = []
  //   }
  //   return { siteSettings, endpoints }
  // },
  data: () => {
    return {
      siteSettings: {},
      endpoints: [],
    }
  },
  async fetch() {
    try {
      this.siteSettings = (await this.$strapi.find('site-settings')) || {}
      this.endpoints = await this.$config.contentTypes.map(
        (type) => `/${type.endpoint}`
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  fetchOnServer: true, // false,
  // mounted() {},
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
