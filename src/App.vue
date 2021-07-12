<template>
  <div id="app">
    <street-map />
  </div>
</template>

<script>
import streetMap from "./components/map.vue";

export default {
  name: "App",
  components: { streetMap },
  setup() {},
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
