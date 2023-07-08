<script setup>
import { SignalIcon } from '@heroicons/vue/24/outline';
const search = ref('')
const router = useRouter();
function handleSearch(){
    router.push({ path: "/search", query:{
        q: search.value
    } });
}
const whatsHappeningItems = ref([
    {
        title: 'SpaceX',
        count: '18.8k Tweets'
    },
    {
        title: '#CodingIsFun',
        count: '8.8k Tweets'
    },
    {
        title: '#artforall',
        count: '1.8k Tweets'
    }
])

const whoToFollowItems = ref([
    {
        name: 'Joe Biden',
        handle: '@JoeBiden',
        image: 'https://picsum.photos/200/200'
    },
    {
        name: 'Joe Biden',
        handle: '@JoeBiden',
        image: 'https://picsum.photos/200/200'
    },
    {
        name: 'Joe Biden',
        handle: '@JoeBiden',
        image: 'https://picsum.photos/200/200'
    }
])
</script>

<template>
  <div class="flex flex-col">
    <!-- Search bar -->
     <div class="relative m-2">
       
            <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
                <div class="w-6 h-6">
                    <SignalIcon @click="handleSearch" />
                </div>
            </div>
            <input v-model="search"
                class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
                placeholder="Search tweet" type="text">
        </div>
    <!-- End Search bar -->


    <!-- preview card: what's happening -->
     <SidebarRightPreviewCard title="What's happening">
         <SidebarRightPreviewCardItems v-for="whatsHappening in whatsHappeningItems" :key="whatsHappening.title">
              <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>

                    <p class="text-xs text-gray-400">
                        {{ whatsHappening.count }}
                    </p>
                </div>
         </SidebarRightPreviewCardItems>
     </SidebarRightPreviewCard>
    <!-- preview card: who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
         <SidebarRightPreviewCardItems v-for="whoToFollow in whoToFollowItems" :key="whoToFollow.name">
                <div class="flex flex-row items-center justify-between p-2">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="whoToFollow.image" :alt="whoToFollow.name">

                        <div class="flex flex-col ml-2">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                            <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
                        </div>
                    </div>
                    <div class="flex h-full">
                        <button
                            class="px-4 py-2 text-xs font-bold text-white bg-black rounded-full dark:text-black dark:bg-white">Follow</button>
                    </div>
                </div>
            </SidebarRightPreviewCardItems>
    </SidebarRightPreviewCard>
  </div>
</template>
