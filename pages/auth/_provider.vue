<template>
  <div>
    <!-- <pre> {{ query }} </pre>
    <pre> {{ params }} </pre>
    <pre>full path {{ $nuxt.$route.fullPath }}</pre>
    <pre>path {{ path }}</pre> -->
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    return { params }
  },
  data: () => {
    return {
      query: {},
      path: '',
      params: null,
    }
  },
  beforeMount() {
    this.query = this.$route.query
    if (this.query.id_token && this.query.access_token) {
      // eslint-disable-next-line no-console
      const provider = this.params.provider
      const path = this.$nuxt.$route.fullPath
        .replace(`/${provider}/?`, `/${provider}?`)
        .replace(`/${provider}?`, `?${provider}&`)
      this.path = path
      this.$nuxt.$router.push(path)
    } else {
      this.$nuxt.$router.push('/auth')
    }
  },
}
</script>
