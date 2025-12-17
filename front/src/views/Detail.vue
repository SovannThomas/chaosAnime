<template>
  <div class="detail">
    <h1>Page de détail</h1>
    <p>ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<style scoped>
.detail {
  padding: 2rem;
  text-align: center;
}
</style>

