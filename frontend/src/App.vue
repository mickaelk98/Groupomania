<script setup>
import { useUser } from './shared/stores';

const userStore = useUser();

// fonction de deconnexion
function logout () {

}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import './assets/sass/base/reset';
</style>