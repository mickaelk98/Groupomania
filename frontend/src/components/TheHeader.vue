<script setup>

// recuperation du userId
// const auth = JSON.parse(localStorage.getItem('auth'));
// const localUserId = auth.userId;

const isAuthenticated = defineProps();
const emit = defineEmits();

</script>

<template>
    <header>
        <div class="logo-site"></div>
        <div class="account">
            <ul>
                <!-- si l'utilisateur est connecté -->
                <template v-if="isAuthenticated"> 
                    <li>
                        <router-link class="redirect" :to="`/profil/${localUserId}`"><i class="fas fa-user"></i></router-link>
                    </li>
                    <li @click="emit('logout')">
                        <i class="fas fa-sign-out"></i>
                    </li>
                </template>

                <!-- sinon -->
                <template v-else-if="isAuthenticated === false">
                    <li>
                         <router-link class="redirect" to="/login">Connexion</router-link>
                    </li>
                    <li>
                         <router-link class="redirect" to="/">Inscription</router-link>
                    </li>
                </template>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/header';
</style>