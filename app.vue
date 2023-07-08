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
              <SidebarLeft :user="user" @on-tweet="handleOpenTweetModal" />
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
      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
        <TweetForm :replyTo="replyTweet" showReply :user="user" @onSuccess="handleFormSuccess"/>
      </UIModal>
    </div>
  </div>
</template>

<script setup>
import { use } from 'h3'
import useAuth from './composables/useAuth.js'
import useTweets from "./composables/useTweets.js"
import useEmitter from "./composables/useEmitter.js"
const darkMode = ref(false)
const emitter = useEmitter()
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet} = useTweets()
const user = useAuthUser()
const isAuthLoading = useAuthLoading()
const postTweetModal = usePostTweetModal()
const replyTweet = useReplyTweet()

function handleFormSuccess(tweet){
   closePostTweetModal()
   navigateTo({
      path: `/status/${tweet.id}`
   })
}
function handleModalClose() {
    closePostTweetModal()
}
function handleOpenTweetModal() {
    openPostTweetModal(null)
}

emitter.$on('replyTweet', (tweet) => {
    openPostTweetModal(tweet)
})

// onMounted: called after the component has been mounted
// onBeforeMount(): caled right before the component is to be mounted
onBeforeMount(() => {
  initAuth()
})
</script>
