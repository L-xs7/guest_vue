<template>
  <div class="container">
    <JSViewer v-bind:report="{ Uri: 'report.rdlx-json' }"></JSViewer>
  </div>
</template>

<script>
import { Viewer } from '@grapecity/activereports-vue'

export default {
  name: 'index',
  components: {
    JSViewer: Viewer,
  },
}
</script>

<style src="../../../node_modules/@grapecity/activereports/styles/ar-js-ui.css"></style>
<style src="../../../node_modules/@grapecity/activereports/styles/ar-js-viewer.css" ></style>

<style scoped lang="scss">
.container {
  flex: 1;
  background-color: #fff;
}
</style>