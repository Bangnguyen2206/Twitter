<template>
    <div>
        <MainSection title="Home" :loading="loading">
           {{user}}
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '../composables/useAuth.js'
const { useAuthUser } = useAuth()
const loading = ref(false)
const user = useAuthUser()

</script>