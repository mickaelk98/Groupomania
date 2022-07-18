<script setup>
</script>

<template>
    <div class="new-post">
            <form>
                <div class="img-name">
                    <img src="../assets/images/default.jpg" alt="photo de profil">
                    <p>john doe</p>
                </div>
                <textarea placeholder="Faite un nouveaux post"></textarea>
                <input type="file">
                <button class="submit-post">Poster</button>
            </form>
        </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/newPost';
</style>