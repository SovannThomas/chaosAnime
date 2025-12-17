<template>
  <div class="page">
    <div class="avatar-container">
      <img :src="avatarUrl" alt="Avatar" class="avatar" />
    </div>

    <!-- Affichage -->
    <div class="name">{{ profile.username }}</div>
    <div class="mail">{{ profile.email }}</div>

    <!-- Inputs -->
    <input
      class="name"
      type="text"
      v-model="profile.username"
      placeholder="Nom d'utilisateur"
    />

    <button class="btn" type="button" @click="save">
      modifier
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usersMock } from "./../../mocks/users"
const route = useRoute()
defineProps({
  username: { type: String, default: "nom" },
  mail: { type: String, default: "Email" },
})
const user = computed(() => {
  const id = Number(route.params.id)
  return usersMock.find(u => u.id === id)
})


const id = computed(() => route.params.id || 'default')
const avatarUrl = computed(() => `https://api.dicebear.com/6.x/pixel-art/png?seed=${id.value}`)

const emit = defineEmits(["edit"])

const save = () => {
  console.log("Profil modifié :", profile.value)
  emit("edit", profile.value)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 26px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.avatar {
  width: 110px;
  height: 110px;
  border: 3px solid #000;
  border-radius: 999px;
  display: grid;
  place-items: center;
  margin: 0 auto;
}

.avatar-icon {
  font-size: 46px;
  line-height: 1;
}

.name {
  font-size: 26px;
  font-weight: 700;
}

.btn {
  width: 220px;
  height: 44px;
  border: 2px solid #000;
 
  cursor: pointer;
  font-size: 16px;
  margin: 0 auto;
}

.btn:active {
  transform: translateY(1px);
}
</style>
