<script setup>
import TheHeader from './components/TheHeader.vue';
import { useUser } from './shared/stores';

const userStore = useUser();

// fonction de deconnexion
function logout () {

}
</script>

<template>
  <TheHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout"/>
  <router-view></router-view>
</template>

<style lang="scss">
@import './assets/sass/base/reset';
</style>