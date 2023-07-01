<template>
    <div>
        <MainSection title="Home" :loading="loading">

            <Head>
                <Title>Home / Twitter</Title>
            </Head>

            <div class="border-b" :class="twitterBorderColor">
                <TweetForm :user="user" @on-success="handleFormSuccess" />
            </div>

            <TweetListFeed :tweets="homeTweets" />

        </MainSection>
    </div>
</template>
<script setup>
const loading = ref(false)

</script>