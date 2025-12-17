<script setup>
// Router est maintenant configuré
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/favorites">Mes Favoris</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 1rem;
  background-color: #f0f0f0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-right: 1rem;
}

nav a.router-link-active {
  color: #42b983;
}
</style>
