<script setup>
import { useRouter } from 'vue-router';
import { useUser } from '../shared/stores';


// recuperation du userId
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;

const userStore = useUser();
const router = useRouter()

// fonction de deconnexion
function logout() {
    userStore.logout();
    router.push('/login');
}

</script>

<template>
    <header>
        <div class="logo-site"></div>
        <div class="account">
            <ul>
                <!-- si l'utilisateur est connecté -->
                <li>
                    <router-link class="redirect" :to="`/profil/${localUserId}`"><i class="fas fa-user"></i></router-link>
                </li>
                <li @click="logout">
                    <i class="fas fa-sign-out"></i>
                </li>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/header';
.logo-site {
    width: 40%;
    height: 80px;
    background: url('../assets/images/icon-left-font-monochrome-white.png') center/cover no-repeat;
    background-size: 100%;
}

</style>