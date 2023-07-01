<script setup>
const route = useRoute()
const nuxt = useNuxtApp()
</script>

<template>
    <div>
        event id: {{ $route.params.id }}
    </div>
</template>