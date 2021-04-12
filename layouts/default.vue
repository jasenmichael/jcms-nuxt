<template>
  <div>
    <nav id="navbar">
      <div v-if="$config.isDev" class="bg-gray-800 text-gray-100">
        <button class="border-none" @click="showDevPanel = !showDevPanel">
          {{ !showDevPanel ? 'Show' : 'Hide' }} Dev Panel
        </button>
        <!-- <div v-if="showDevPanel">$nuxt.$route: {{ $nuxt.$route }}</div> -->
        <div v-if="showDevPanel">
          $nuxt.$route.path: {{ $nuxt.$route.path }}
        </div>
      </div>
      <div class="bg-gray-200 text-gray-900 font-bold">
        <div class="flex flex-col mx-auto">
          <!-- nav -->
          <div class="flex px-6 py-2">
            <nuxt-link to="/" class="">home</nuxt-link>
            <div class="ml-auto flex space-x-2">
              <div>Login/Register</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="$nuxt.$route.path === '/admin'">
      <Nuxt keep-alive :navbar-height="getNavbarHeight" />
    </div>
    <div v-else>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      showDevPanel: false,
    }
  },
  computed: {
    getNavbarHeight() {
      return document.getElementById('navbar')
        ? document.getElementById('navbar').offsetHeight
        : 0
    },
  },
}
</script>
