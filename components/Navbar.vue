<template>
  <nav>
    <div v-if="$config.isDev" class="bg-gray-800 text-gray-100">
      <button class="border-none" @click="showDevPanel = !showDevPanel">
        {{ !showDevPanel ? 'Show' : 'Hide' }} Dev Panel
      </button>
      <!-- <div v-if="showDevPanel">$nuxt.$route: {{ $nuxt.$route }}</div> -->
      <div v-if="showDevPanel">$nuxt.$route.path: {{ $nuxt.$route.path }}</div>
    </div>
    <div class="bg-gray-200 text-gray-900 font-bold">
      <div class="flex flex-col mx-auto">
        <!-- nav -->
        <div class="flex px-6 py-2">
          <nuxt-link to="/" class="">Home</nuxt-link>
          <div class="ml-auto">
            <div>
              <nuxt-link
                v-show="!$strapi.user"
                to="/auth"
                class="border-2 border-gray-300 rounded px-2"
              >
                Login/Register
              </nuxt-link>
              <div v-show="$strapi.user">
                <nuxt-link
                  class="border-2 border-gray-300 rounded px-2"
                  to="/me"
                >
                  Account
                </nuxt-link>
                <nuxt-link
                  class="border-2 border-gray-300 rounded ml-1 px-2"
                  to="/logout"
                >
                  Logout
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => {
    return {
      showDevPanel: false,
    }
  },
}
</script>
