<script setup>
import { reactive } from 'vue';


// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;
console.log(auth, localUserId, userToken);

// gere l'éta des donnée
const state = reactive({
    user: {}
});

// recuperation des donnée de l'utilisateur
const getUserProfil = async () => {
    const response = await fetch('http://localhost:5000/api/auth/'+ localUserId, {
        headers: {
            'content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        }
    });

    const user = await response.json();
    state.user = user;
    console.log(state.user);
}

getUserProfil();
</script>

<template>
    <div class="new-post">
            <form>
                <div class="img-name">
                    <img :src="state.user.image" alt="photo de profil">
                    <p>{{ state.user.firstName }} {{ state.user.lastName }}</p>
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