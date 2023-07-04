<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">
      <UIInput
        v-model="data.username"
        label="Username"
        placeholder="@username"
        type="text"
      />

      <UIInput
        label="Password"
        placeholder="********"
        type="password"
        v-model="data.password"
      />

      <div>
        <button @click="handleLogin">
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>

import useAuth from '../../composables/useAuth.js'

const data = reactive({
  username: '',
  password: '',
  loading: false,
})

async function handleLogin() {
  const { login } = useAuth()
  data.loading = true
  try {
    await login({
      username: data.username,
      password: data.password,
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false
  }
}
</script>
