<template>
  <div class="home">
    <h1>Page d'accueil</h1>
    <p>Bienvenue sur la page principale</p>
    
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="data">
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
    <button @click="fetchData">Tester l'API</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CallBackend from '../services/api.js'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Exemple d'utilisation
    data.value = await CallBackend.get('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}
</style>

