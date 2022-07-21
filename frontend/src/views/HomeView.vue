<script setup>
import NewPost from '../components/NewPost.vue';
import PostList from '../components/PostList.vue';
import TheHeader from '../components/TheHeader.vue';
</script>

<template>
    <TheHeader />
    <main>
        <NewPost />
        <PostList />
    </main>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/home';
</style>