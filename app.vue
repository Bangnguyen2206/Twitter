<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- App -->
      <div v-if="false" class="min-h-full">
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

          <main
            class="col-span-12 md:col-span-8 xl:col-span-6 h-full"
          >
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
      <AuthPage v-else/>
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false)
</script>

