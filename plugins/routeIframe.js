export const routeIframe = (path, frontendUrl) => {
  // eslint-disable-next-line no-console
  console.log('routing to /admin')
  if (process.client) {
    document.getElementById('admin').contentWindow.postMessage(
      JSON.stringify({ path, method: 'changeRoute' }),
      '*'
      // frontendUrl
    )
    // document.getElementById(id).src = document.getElementById(id).src
  }
  //   return '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++yoyo'
}
