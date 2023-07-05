<template>
    <div>
        <MainSection title="Home" :loading="loading">
           <!-- {{user}} -->
           <TweetForm :user="user"/>
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '../composables/useAuth.js'
const { useAuthUser } = useAuth()
const user = useAuthUser()
const loading = ref(false)
</script>