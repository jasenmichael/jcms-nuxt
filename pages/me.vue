<template>
  <div class="w-screen mx-4">
    <button
      v-if="$strapi.user.role.type !== 'authenticated'"
      class="w-full text-xl font-bold"
    >
      <nuxt-link to="/admin">CMS Dashboard</nuxt-link>
    </button>
    <!-- <button @click="logout">logout</button> -->
    <div class="overflow-x-scroll">
      <pre>{{ { token } }}</pre>
      <pre>{{ { user } }}</pre>
    </div>
    <!-- <input
      id="uploadFile"
      type="file"
      name="uploadFile"
      @change="selectedFile($event)"
    />
    <button v-if="uploadFile" @click="upload()">upload</button>
    <img
      v-if="uploadPreview"
      style="width: 300px"
      :src="uploadPreview"
      :class="uploading && 'animate-pulse'"
      alt=""
    />
    <pre>{{ res }}</pre>
    <button @click="getFiles">
      {{ !files.length && !filesLoaded ? 'get files' : 'reload files' }}
    </button>
    <div v-for="(img, i) in files.reverse()" :key="i">
      <img
        :src="(img.formats && img.formats.thumbnail.url) || img.url"
        alt=""
      />
    </div>
    <pre>{{ { files } }}</pre> -->
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => {
    return {
      files: [],
      filesLoaded: false,
      res: '',
      uploadFile: null,
      uploadPreview: null,
      uploading: false,
    }
  },
  computed: {
    user() {
      return this.$strapi.user
    },
    token() {
      return this.$strapi.getToken()
    },
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    logout() {
      // this.$strapi.logout()
      this.$router.push('/logout')
    },
    async getFiles() {
      // this.$strapi.
      this.files = await this.$strapi.find('upload/files')
      // .then((files) =>
      //   files.map((file) => {
      //     return {
      //       name: file.name,
      //       url: file.url,
      //       ...file.formats,
      //     }
      //   })
      // )
      this.filesLoaded = true
    },
    selectedFile(event) {
      this.uploadFile = event.target.files[0]
      this.uploadPreview = URL.createObjectURL(this.uploadFile)
    },
    async upload() {
      const formdata = new FormData()
      formdata.append('path', '/wazza/')
      formdata.append('files', this.uploadFile, this.uploadFile.name)
      formdata.append('fileInfo', {
        alternativeText: 'alt',
        caption: 'cap',
        name: 'newname.png',
      })

      // const requestOptions = {
      //   method: 'POST',
      //   // body: this.formdata,
      //   redirect: 'follow',
      // }
      this.res = 'Uploading...'
      if (process.client) {
        document.getElementById('uploadFile').value = null
      }
      this.uploading = true
      const file = await this.$strapi.create('upload', formdata)
      this.res = file[0].name + ' uploaded sucessfully'
      await this.getFiles()
      this.uploading = false
      this.uploadPreview = false
      setTimeout(() => {
        this.res = ''
      }, 1100)
    },
  },
}
</script>

<style>
input,
button {
  @apply border-2 px-2 mt-2;
}
</style>
