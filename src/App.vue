<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "./assets/style/index.scss";

#app {
  height: 100%;
}

.main {
  background: #ededed;
}
</style>
