<template>
    <div>
       <TweetItem :tweet="props.tweet"/>
       <TweetForm placeholder="Tweet your reply" :user="props.user" :reply-to="props.tweet" @on-success="handleFormSuccess"/>
       <TweetListFeed :tweets="replies"/>
    </div>
</template>
<script setup>

const props = defineProps({
    tweet:{
        type: Object,
        required: true
    },
    user:{
        type: Object,
        reuqired: true
    }
})

const replies = computed(() => props.tweet?.replies || [])

function handleFormSuccess(tweet){
   navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>