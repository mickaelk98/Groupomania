<script setup>
import TheHeader from '../components/TheHeader.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUser, usePosts } from '../shared/stores';

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
const userStore = useUser();
const postStore = usePosts();

// recupere les information d'un utilisateur
userStore.getOtherUserInfo(userUrlId) 


// fonction de suppression d'un profil
const deleteProfil = async function() {
    await postStore.deleteOneUserPost(userUrlId)
    await userStore.deleteUser(userUrlId, userToken)
    router.push('/')
}


</script>

<template>
    <TheHeader />
    <div class="profil-page">
        <main class="profil">
            <div class="container">
                <h1 class="title">Profil</h1>
                <div class="left">
                    <h2 class="name">{{ userStore.otherUser.lastName }} {{ userStore.otherUser.firstName }}</h2>
                    <img :src="userStore.otherUser.image" alt="photo de profil" class="img-profil">
                </div>
                <div class="right">
                    <h2 class="title">Email</h2>
                    <p>{{ userStore.otherUser.email }}</p>
                    <h2 class="title">Description</h2>
                    <p>
                        {{ userStore.otherUser.description }}
                    </p>
                </div>
            </div>
            <div class="buttons">
                <!-- <button class="update" @click="updateFormClass = 'visible'">Modifier le profil</button> -->
                <router-link id="redirect" :to="`/profil/${localUserId}/update`" v-if="localUserId === userUrlId">Modifier le profil</router-link>
                <button class="delete" @click="deleteProfil" v-if="localUserId === userUrlId">Supprimer le Profil</button>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/profil';
</style>