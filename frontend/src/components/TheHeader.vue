<script setup>

// recuperation du userId
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;


// fonction de deconnexion
const signout = () => {
    localStorage.clear();
}
</script>

<template>
    <header>
        <div class="logo-site"></div>
        <div class="account">
            <ul>
                <li>
                    <router-link :to="`/profil/${localUserId}`"><i class="fas fa-user"></i></router-link>
                </li>
                <li>
                    <router-link @click="signout" to="/login"><i class="fas fa-sign-out"></i></router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/header';
</style>