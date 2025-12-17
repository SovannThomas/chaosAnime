<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/header.vue'

const route = useRoute()
const id = computed(() => route.params.id || 'default')
const imageUrl = computed(() => `https://api.dicebear.com/6.x/pixel-art/png?seed=${id.value}`)
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <router-view />

      <img :src="imageUrl" alt="Yuji Itadori">
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
