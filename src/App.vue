<template>
  <div id="app">
    <!-- 测试 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  margin: 0px;
  padding: 0px;
  overflow:hidden !important; 
}
</style>
