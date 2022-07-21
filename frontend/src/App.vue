<script setup>
import TheHeader from './components/TheHeader.vue';

// fonction de deconnexion
function logout () {

}
</script>

<template>
  <TheHeader :isLoggedin="false" @logout="logout"/>
  <router-view></router-view>
</template>

<style lang="scss">
@import './assets/sass/base/reset';
</style>