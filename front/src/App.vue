<script setup>
import Header from './components/header.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <router-view />

    </main>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}
</style>
