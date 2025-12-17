<template>
  <div class="page">
    <div class="avatar-container">
      <img :src="avatarUrl" alt="Avatar" class="avatar" />
    </div>

    <input class="name" type="text" :value="username" @input="updateUsername" disabled></input>
    <input class="mail" type="email" :value="mail" @input="updateMail" disabled></input>

    <button class="btn" type="button" @click="$emit('edit')">
      modifier
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  username: { type: String, default: "nom" },
  mail: { type: String, default: "Email" },
  imageUrl: { type: String, default: "https://api.dicebear.com/6.x/pixel-art/png?seed=" },
})
defineEmits(["edit"])

const route = useRoute()
const id = computed(() => route.params.id || 'default')
const avatarUrl = computed(() => `${props.imageUrl}${id.value}`)
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
  overflow: hidden;
}

.avatar-image {
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
