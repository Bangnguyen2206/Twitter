<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />
      <!-- App -->
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left Slidebar -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>

          <!-- Main section -->

          <main class="col-span-12 md:col-span-8 xl:col-span-6 h-full">
            <!-- route outlet -->
            <!-- component matched by the route will render here -->
            <router-view />
          </main>

          <!-- Right Slidebar -->

          <div class="hidden md:block xl:col-span-4 md:col-span-3 col-span-12">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <!-- End App -->

      <!-- Authentication -->
      <AuthPage v-else />
    </div>
  </div>
</template>

<script setup>
import { use } from 'h3'
import useAuth from './composables/useAuth.js'
const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const user = useAuthUser()
const isAuthLoading = useAuthLoading()
// onMounted: called after the component has been mounted
// onBeforeMount(): caled right before the component is to be mounted
onBeforeMount(() => {
  initAuth()
})
</script>
