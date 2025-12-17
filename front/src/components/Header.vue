<template>
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <router-link to="/" class="logo-link">
            <h1>ChaosAnime</h1>
          </router-link>
        </div>
        <nav class="nav">
          <router-link to="/animes" class="nav-link">Animes</router-link>
          <router-link to="/profile/1" class="nav-link">Mon profil</router-link>
          <router-link to="/favorites" class="nav-link heart-link">❤️</router-link>
          <div class="avatar-container">
            <img :src="imageUrl" alt="Avatar" class="avatar" />
          </div>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const id = computed(() => route.params.id || 'default')
  const imageUrl = computed(() => `https://api.dicebear.com/6.x/pixel-art/png?seed=${id.value}`)
  </script>
  
  <style scoped>
  .header {
    background-color: #2c3e50;
    color: white;
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
  
  .logo-link {
    text-decoration: none;
    color: white;
  }
  
  .logo h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .nav-link.router-link-active {
    background-color: #42b983;
    color: white;
  }

  .heart-link {
    font-size: 1.2rem;
    padding: 0.5rem;
    line-height: 1;
  }
  
  .avatar-container {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    object-fit: cover;
    cursor: pointer;
    transition: border-color 0.3s;
  }
  
  .avatar:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }
  </style>