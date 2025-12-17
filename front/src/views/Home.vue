<script setup>
import { onMounted, ref } from 'vue';

const animes = ref([]);
const favorites = ref([]);
const userId = 1; // Hardcoded as per plan

async function fetchAnimes() {
    try {
        const res = await fetch('http://localhost:3000/api/animes');
        animes.value = await res.json();
    } catch (error) {
        console.error("Error fetching animes:", error);
    }
}

async function fetchFavorites() {
    try {
        const res = await fetch(`http://localhost:3000/api/favorites/${userId}`);
        const data = await res.json();
        // Extract just the animeIds for easier checking
        favorites.value = data.map(fav => fav.animeId);
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
}

function isFavorite(animeId) {
    return favorites.value.includes(animeId);
}

async function toggleFavorite(anime) {
    const animeId = anime.id;
    if (isFavorite(animeId)) {
        // Remove from favorites
        try {
            await fetch(`http://localhost:3000/api/favorites/${userId}/${animeId}`, {
                method: 'DELETE'
            });
            favorites.value = favorites.value.filter(id => id !== animeId);
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    } else {
        // Add to favorites
        try {
            await fetch(`http://localhost:3000/api/favorites/${userId}/${animeId}`, {
                method: 'PUT'
            });
            favorites.value.push(animeId);
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    }
}

onMounted(async () => {
    await fetchAnimes();
    await fetchFavorites();
});
</script>

<template>
  <div class="home-container">
    <h1>ChaosAnime</h1>
    <div class="anime-grid">
      <div v-for="anime in animes" :key="anime.id" class="anime-card">
        <div class="image-wrapper">
          <img :src="anime.imageUrl" :alt="anime.title" />
          <div 
            class="heart-icon" 
            :class="{ active: isFavorite(anime.id) }" 
            @click.stop="toggleFavorite(anime)"
          >
            <span v-if="isFavorite(anime.id)">❤️</span>
            <span v-else>🤍</span>
          </div>
        </div>
        <div class="anime-info">
          <h3>{{ anime.title }}</h3>
          <p class="rating">⭐ {{ anime.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
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
