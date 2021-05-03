<template>
  <div>
    <!-- <pre>{{ $strapi.user }}</pre> -->
    <!-- <pre>{{ { query: $nuxt.$route.query } }}</pre>
    <pre>{{ { login: $nuxt.$route.query.login } }}</pre>
    <pre>{{ { login: $nuxt.$route.query.register } }}</pre>
    <pre>{{ $nuxt.$route.fullPath }}</pre> -->
    <div
      v-if="!mounted"
      class="flex mx-auto text-2xl font-black items-center pt-4"
    >
      <div class="mx-auto">Loading...</div>
    </div>

    <div v-else>
      <div v-show="selected" class="flex flex-col">
        <div
          class="flex flex-col border-b border-gray-200 mx-auto items-center"
        >
          <nav class="-mb-px flex space-x-2" aria-label="Tabs">
            <div
              :class="selected === 'login' ? 'selected' : 'notselected'"
              @click="selected = 'login'"
            >
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
              <span class="text-2xl font-bold">Login</span>
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
              <span class="text-2xl font-bold">Register</span>
            </div>
          </nav>
        </div>

        <div class="mx-auto pt-6 text-2xl w-screen">
          <div class="mx-2">
            <div
              class="mx-auto p-8 border-2 bg-blue-300 border-blue-400 rounded-lg max-w-md h-full"
            >
              <div v-show="selected === 'login'">
                <FormulateForm
                  v-model="formValues"
                  class="min-w-full my-4"
                  form-errors-class="uppercase text-red-700 text-sm"
                  :form-errors="errMsgs"
                  @submit="login"
                >
                  <FormulateInput
                    type="text"
                    name="email"
                    label="Email"
                    validation="required|email"
                    input-class="w-full"
                    element-class="bg-white bg-clip-border rounded-lg"
                    error-class="uppercase text-red-700 text-sm"
                  />
                  <!-- <div class="flex items-center"> -->
                  <FormulateInput
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    label="Password"
                    validation="required"
                    element-class="bg-white bg-clip-border rounded-lg"
                    input-class="rounded-lg w-full flex items-center"
                    error-class="uppercase text-red-700 text-sm"
                  >
                    <template #suffix="{ label, id }">
                      <!-- <suffix -->
                      <div
                        :for="id"
                        class="w-10 h-10 relative float-right -top-12 mr-1 bg-clip-padding text-gray-700 bg-white p-2 flex items-center"
                        :aria-label="label"
                        @click="showPassword = !showPassword"
                      >
                        <!-- > -->
                        <svg
                          v-if="showPassword"
                          class="h-8 w-8 text-red-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <defs />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>

                        <svg
                          v-else
                          class="h-8 w-8 text-green-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <defs />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      </div>
                      <!-- </suffix> -->
                    </template>
                  </FormulateInput>
                  <!-- </div> -->

                  <FormulateInput
                    name="remember"
                    type="checkbox"
                    label="Remember Me?"
                    label-class="pl-2 text-base flex items-center"
                    wrapper-class="flex flex-row items-center -mt-7"
                    element-class="formulate-input-element formulate-input-element--checkbox bg-white rounded-lg "
                  />
                  <button
                    class="ml-auto border-2 py-3 w-full border-white rounded-lg -mt-4 mb-1 bg-green-400 text-white"
                    type="submit"
                  >
                    Login
                  </button>
                  <nuxt-link
                    class="text-gray-800 underline float-right text-sm"
                    to="/auth?forgot-password"
                    >forgot password?</nuxt-link
                  >

                  <FormulateErrors />
                </FormulateForm>
                <a
                  class="px-1 ml-auto border-2 py-2 w-full border-white rounded-lg -mt-4 mb-1 bg-green-400 text-white"
                  href="http://localhost:1337/connect/google"
                >
                  Google
                </a>
              </div>

              <div v-show="selected === 'register'">
                <div>Register</div>
                username email password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- generate provider paths -->
    <nuxt-link v-show="false" to="/auth/google" class="hidden"
      >google</nuxt-link
    >
    <nuxt-link v-show="false" to="/auth/facebook" class="hidden"
      >facebook</nuxt-link
    >
  </div>
</template>

<script>
const CryptoJS = require('crypto-js')
export default {
  data() {
    return {
      selected: null,
      //
      formValues: {
        email: '',
        password: '',
        remember: false,
      },
      showPassword: false,
      errMsgs: [],
      encrypted: null,
      salt: 'a9e8i7o6u5',
      mounted: false,
      query: {},
    }
  },
  computed: {
    user() {
      return this.$strapi.user
    },
  },
  async beforeMount() {
    this.mounted = false
    if (this.$strapi.user) {
      this.$router.push({ path: '/me' })
    } else {
      // login to external provider if query passed --- ?[provider]&{body}
      const providers = ['google', 'facebook']
      const provider =
        this.$route.fullPath.includes('/auth?') &&
        this.$route.fullPath.includes('&id_token')
          ? this.$route.fullPath.split('/auth?')[1].split('&')[0]
          : null
      if (provider && providers.includes(provider)) {
        this.selected = null
        const providerData = provider
          ? this.$route.fullPath.split('/auth?')[1]
          : null
        const { user, jwt } = await fetch(
          `${this.$config.strapiUrl}/auth/${provider}/callback?${providerData}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'GET',
          }
        )
          .then((res) => {
            return res.json()
          })
          .then((res) => {
            if (res.data || res.error) {
              // eslint-disable-next-line no-console
              console.log('RES:', res)
              this.errMsgs.push(
                res.data ? res.data.message : res.error || 'Error'
              )
              this.errMsgs.push('Contact an admnistrator')
              setTimeout(() => {
                this.errMsgs = []
              }, 4000)
              return res
            }
            return res
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.$router.push('/')
          })
        // console.log(userData)
        if (user && jwt && !user.blocked && user.confirmed) {
          this.$strapi.setUser(user)
          this.$strapi.setToken(jwt)
          if (user.role.type === 'editor') {
            await this.loginStrapiAdmin(user.email, 'user.admin_secret')
          }
          this.$router.push('/me')
        }
        if (user && user.blocked) {
          this.errMsgs.push(`${user.email} is blocked`)
        }
        if (user && !user.confirmed) {
          this.errMsgs.push(`${user.email} has not been confirmed`)
        }
      }
      // login selected
      if (this.$route.fullPath.includes('/auth?login')) {
        this.selected = 'login'
      }
      // register selected
      if (this.$route.fullPath.includes('/auth?register')) {
        this.selected = 'register'
      } else this.selected = 'login'
    }
    const encryptedCredentials =
      JSON.parse(localStorage.getItem('remember')) || null
    if (encryptedCredentials) {
      this.formValues.remember = true
      const { email, password } = this.decrypt(encryptedCredentials)
      this.formValues.email = email
      this.formValues.password = password
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    async login() {
      try {
        await this.$strapi.login({
          identifier: this.formValues.email,
          password: this.formValues.password,
        })
        if (this.$strapi.user.role.type === 'editor') {
          await this.loginStrapiAdmin(
            this.formValues.email,
            this.formValues.password
          )
          // if rememberMe, save email and password to local storage
          if (
            this.formValues.remember &&
            this.formValues.email &&
            this.formValues.password
          ) {
            const encryptedCredentials = this.encrypt({
              email: this.formValues.email,
              password: this.formValues.password,
            })
            localStorage.setItem(
              'remember',
              JSON.stringify(encryptedCredentials)
            )
          } else {
            localStorage.removeItem('remember')
          }
          this.formValues.email = ''
          this.formValues.password = ''
          this.$router.push('/me')
        }
      } catch (error) {
        error.response.data.message[0].messages.forEach((error) => {
          this.errMsgs.push(error.message.replace('Identifier', 'Email'))
        })
        // eslint-disable-next-line no-console
        console.log('ERRORS', error.response.data)
        setTimeout(() => {
          this.errMsgs = []
        }, 3000)
      }
    },
    logout() {
      this.$strapi.logout()
      localStorage.removeItem('adminJwtToken')
      localStorage.removeItem('adminUserInfo')
      this.$router.push('/')
    },
    async loginStrapiAdmin(email, password) {
      // const key = this.formValues.email
      email = this.formValues.email.includes('@')
        ? email
        : this.$strapi.user.email
      await fetch(`${this.$config.strapiUrl}/admin/login`, {
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          const token = res.data.token || null
          const user = res.data.user || null
          localStorage.setItem('adminJwtToken', JSON.stringify(token))
          localStorage.setItem('adminUserInfo', JSON.stringify(user))
        })
        .catch((error) => {
          this.errMsgs.push(`error login admin ${error.toString()}`)
        })
    },

    //     Error
    // Contact an admnistrator
    // dreadycarpenter@gmail.com is blocked
    // dreadycarpenter@gmail.com has not been confirmed
    encrypt(credentials) {
      const msg = credentials.email + '-_-' + credentials.password
      return CryptoJS.AES.encrypt(msg, this.salt).toString()
    },
    decrypt(encrypted) {
      // const msg = JSON.parse(localStorage.getItem('remember'))
      const credentials = [
        CryptoJS.AES.decrypt(encrypted, this.salt).toString(CryptoJS.enc.Utf8),
      ].map((line) => ({
        email: line.split('-_-')[0],
        password: line.split('-_-')[1],
      }))[0]
      return credentials
    },
  },
}
</script>

<style>
.selected {
  @apply border-indigo-500 text-indigo-600 group inline-flex items-center py-4 px-1 border-b-2;
}
.notselected {
  @apply border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2;
}
.formulate-input-label {
  @apply text-gray-700;
}
</style>
