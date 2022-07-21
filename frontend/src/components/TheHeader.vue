<script setup>

// recuperation du userId
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const emit = defineEmits();

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
                <li @click="emit('logout')">
                    <i class="fas fa-sign-out"></i>
                </li>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/header';
</style>