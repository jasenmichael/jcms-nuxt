<template>
  <div>
    <div class="flex flex-col mx-auto">
      <div class="border-b border-gray-200 mx-auto items-center">
        <nav class="-mb-px flex space-x-2" aria-label="Tabs">
          <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
          <div
            :class="selected === 'login' ? 'selected' : 'notselected'"
            @click="selected = 'login'"
          >
            <!--
            Heroicon name: solid/user

            Current: "text-indigo-500", Default: "text-gray-400 group-hover:text-gray-500"
          -->
            <svg
              class="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Login</span>
          </div>

          <div
            :class="selected === 'register' ? 'selected' : 'notselected'"
            @click="selected = 'register'"
          >
            <!-- Heroicon name: solid/office-building -->
            <svg
              class="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Register</span>
          </div>
        </nav>
      </div>
      <div class="mx-auto pt-6">
        <div class="p-8 border-2 border-gray-300 rounded-lg">
          <div v-if="selected === 'login'">
            <FormulateForm v-model="formValues">
              <FormulateInput label="Email" type="email" name="email" />
              <FormulateInput
                label="Password"
                type="password"
                name="password"
              />
            </FormulateForm>
            <button
              class="font- ml-auto border-2 mt-4 py-3 w-full border-gray-300"
              @click="login()"
            >
              Login
            </button>
          </div>
          <div v-if="selected === 'register'">
            <div>Register</div>
            username email password
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    // eslint-disable-next-line no-console
    console.log(params)
  },
  data() {
    return {
      formValues: {
        email: 'admin@jcms.io',
        password: 'Strapi123456',
      },
      selected: 'login',
      // email: 'admin@jcms.io',
      // password: 'Strapi123456',
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
        identifier: this.formValues.email,
        password: this.formValues.password,
      })
      this.loginStrapiAdmin()
      this.$router.push('/me')
    },
    logout() {
      this.$strapi.logout()
      this.$router.push('/')
    },
    loginStrapiAdmin() {
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
          // console.log({
          //   token,
          //   user,
          // })
          // sessionStorage.setItem('adminJwtToken', JSON.stringify(token))
          // sessionStorage.setItem('adminUserInfo', JSON.stringify(user))
          localStorage.setItem('adminJwtToken', JSON.stringify(token))
          localStorage.setItem('adminUserInfo', JSON.stringify(user))
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
  },
  // methods: {
  //   async login() {
  //     await this.$strapi.login({
  //       identifier: this.email,
  //       password: this.password,
  //     })
  //     this.loginStrapi()
  //     // this.$router.push('/authenticated')
  //   },
  //   logout() {
  //     this.$strapi.logout()
  //     this.res = ''
  //     this.$router.push('/')
  //   },
  //   loginStrapi() {
  //     // fetch(`http://localhost:1337/admin/login`, {
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
  //         console.log({
  //           token,
  //           user,
  //         })
  //         sessionStorage.setItem('adminJwtToken', JSON.stringify(token))
  //         sessionStorage.setItem('adminUserInfo', JSON.stringify(user))
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

.formulate-input-label {
  @apply text-gray-700;
}

/* formulate-input-label--before */
</style>
