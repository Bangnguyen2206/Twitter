<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
      <TweetDetails :user="user" :tweet="tweet" />
    </MainSection>
  </div>
</template>

<script setup>
import useTweets from '../../composables/useTweets.js'
import useAuth from '../../composables/useAuth.js'


const loading = ref(false)
const tweet = ref(null)
const { useAuthUser } = useAuth()
const { getTweetById } = useTweets()
const user = useAuthUser()

function getTweetIdFromRoute() {
  return useRoute().params.id
}
watch(() => useRoute().fullPath, () => getTweet())
async function getTweet() {
  loading.value = true
  try {
    const response = await getTweetById(getTweetIdFromRoute())
    tweet.value = response.tweet
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
onBeforeMount(() => {
  getTweet()
})
</script>
