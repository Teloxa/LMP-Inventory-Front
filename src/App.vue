<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
#app {
  min-height: 100vh;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: var(--pro-font);
  background-color: var(--pro-bg);
  color: var(--pro-text);
}
</style>
