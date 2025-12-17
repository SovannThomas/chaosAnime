<script setup>
import { onMounted, ref } from 'vue';

const favorites = ref([]);
const userId = 1; // Hardcoded as per plan

async function fetchFavorites() {
    try {
        const res = await fetch(`http://localhost:3000/api/favorites/${userId}`);
        const data = await res.json();
        favorites.value = data;
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
}

async function removeFavorite(animeId) {
    try {
        await fetch(`http://localhost:3000/api/favorites/${userId}/${animeId}`, {
            method: 'DELETE'
        });
        // Remove from local list after successful deletion
        favorites.value = favorites.value.filter(fav => fav.animeId !== animeId);
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
}

onMounted(() => {
    fetchFavorites();
});
</script>

<template>
  <div class="favorites-container">
    <h1>Mes Favoris</h1>
    <div v-if="favorites.length === 0" class="no-favorites">
      <p>Aucun anime favori pour le moment.</p>
    </div>
    <div v-else class="anime-grid">
      <div v-for="fav in favorites" :key="fav.id" class="anime-card">
        <div class="image-wrapper">
          <img :src="fav.anime.imageUrl" :alt="fav.anime.title" />
          <div class="heart-icon active" @click.stop="removeFavorite(fav.animeId)">
            ❤️
          </div>
        </div>
        <div class="anime-info">
          <h3>{{ fav.anime.title }}</h3>
          <p class="rating">⭐ {{ fav.anime.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-container {
  padding: 2rem;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.anime-card {
  position: relative;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.anime-card:hover {
  transform: translateY(-5px);
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heart-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background-color 0.2s;
}

.heart-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
}

.anime-info {
  padding: 1rem;
}

.anime-info h3 {
  margin: 0;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rating {
  margin-top: 0.5rem;
  color: #666;
}
</style>
