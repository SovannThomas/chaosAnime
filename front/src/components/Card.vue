<template>
    <div class="card">
        <h1>{{ title }}</h1>
        <h2>{{ description }}</h2>
    </div>
</template>


<script setup >
    import { defineProps } from 'vue'
    defineProps({
    title: String,
    description: String
    })
</script>

<style>
    .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        max-width: 300px;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
        margin: 10px;
    }
    h1 {
        font-size: 1.5em;
        margin-bottom: 8px;
    }
    h2 {
        font-size: 1em;
        color: #666;
    }

</style>