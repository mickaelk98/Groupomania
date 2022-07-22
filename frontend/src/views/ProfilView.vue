<script setup>
import TheHeader from '../components/TheHeader.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUser } from '../shared/stores/userStore';

// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;

// recupere les informations sur la route actuelle
const route = useRoute();
const router = useRouter()

// recupere l'id dans l'url
const userUrlId = route.params.userId;

// recupere le store user
const useStore = useUser();
// recupere les information d'un utilisateur
useStore.getUserProfil(userUrlId)

// fonction de suppression d'un profil
const deleteProfil = async function() {
    await useStore.deleteUser(userUrlId, userToken)
    router.push('/')
}


</script>

<template>
    <TheHeader />
    <div class="profil-page">
        <!-- formulaire de modification -->
        <main class="profil">
            <div class="container">
                <h1 class="title">Profil</h1>
                <div class="left">
                    <h2 class="name">{{ useStore.user.firstName }} {{ useStore.user.lastName }} </h2>
                    <img :src="useStore.user.image" alt="photo de profil" class="img-profil">
                </div>
                <div class="right">
                    <h2 class="title">Email</h2>
                    <p>{{ useStore.user.email }}</p>
                    <h2 class="title">Description</h2>
                    <p>
                        {{ useStore.user.description }}
                    </p>
                </div>
            </div>
            <div class="buttons">
                <!-- <button class="update" @click="updateFormClass = 'visible'">Modifier le profil</button> -->
                <router-link id="redirect" :to="`/profil/${localUserId}/update`">Modifier le profil</router-link>
                <button class="delete" @click="deleteProfil">Supprimer le Profil</button>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/profil';
</style>