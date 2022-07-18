<script setup>
import TheHeader from '../components/TheHeader.vue';
import NewPost from '../components/NewPost.vue';
import PostList from '../components/PostList.vue';
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