<template>
  <div class="page">
    <div class="avatar" aria-label="Avatar">
      <span class="avatar-icon">👤</span>
    </div>

    <div class="name">{{ username }}</div>
    <div class="mail">{{ mail }}</div>

    <button class="btn" type="button" @click="$emit('edit')">
      modifier
    </button>
  </div>
</template>

<script setup>
defineProps({
  username: { type: String, default: "nom" },
  mail: { type: String, default: "Email" },
})
defineEmits(["edit"])
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
