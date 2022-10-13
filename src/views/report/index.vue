<template>
  <div class="container">
    <Father/>
  </div>
</template>

<script>
import Father from './components/father.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'index',
  components: {
    Father
  },
}
</script>


<style scoped lang="scss">
.container {
  flex: 1;
  background-color: #fff;
}
</style>