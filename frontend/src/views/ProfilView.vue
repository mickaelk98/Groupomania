<script setup>
import { ref } from 'vue';
import TheHeader from '../components/TheHeader.vue';
import UpdateProfil from '../components/UpdateProfil.vue'

const updateFormClass = ref('hidden')

</script>

<template>
    <TheHeader />
    <div class="profil-page">
        <!-- formulaire de modification -->
        <div :class="updateFormClass">
            <UpdateProfil />
        </div>
        <main class="profil">
            <div class="container">
                <h1 class="title">Profil</h1>
                <div class="left">
                    <h2 class="name">john doe</h2>
                    <img src="../assets/images/default.jpg" alt="photo de profil" class="img-profil">
                </div>
                <div class="right">
                    <h2 class="title">Email</h2>
                    <p>a@mail.com</p>
                    <h2 class="title">Description</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Qui quas iusto in iste deserunt aut sed magni dolor dolore hic.
                    </p>
                </div>
            </div>
            <div class="buttons">
                <button class="update" @click="updateFormClass = 'visible'">Modifier le profil</button>
                <button class="delete">Supprimer le Profil</button>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/profil';
</style>