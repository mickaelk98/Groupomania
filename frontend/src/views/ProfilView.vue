<script setup>
import { ref } from 'vue';
import TheHeader from '../components/TheHeader.vue';
import UpdateProfil from '../components/UpdateProfil.vue';
import { useUser } from '../shared/stores/userStore';

// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;

const useStore = useUser();
const user = useStore.user;
useStore.getUserProfil(localUserId)


const updateFormClass = ref('hidden')

// fonction de suppression d'un profil
const deleteProfil = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/'+ localUserId, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken,
            }
        })

        const data = await response.json();

       console.log(data);
    } catch (e) {
        console.log(e);
    }
}

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
                    <h2 class="name">{{ user.firstName }} {{ user.lastName }} </h2>
                    <img :src="user.image" alt="photo de profil" class="img-profil">
                </div>
                <div class="right">
                    <h2 class="title">Email</h2>
                    <p>{{ user.email }}</p>
                    <h2 class="title">Description</h2>
                    <p>
                        {{ user.description }}
                    </p>
                </div>
            </div>
            <div class="buttons">
                <button class="update" @click="updateFormClass = 'visible'">Modifier le profil</button>
                <button class="delete" @click="deleteProfil">Supprimer le Profil</button>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/profil';
</style>