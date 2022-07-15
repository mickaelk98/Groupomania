<script></script>

<template>
    <div class="signup-page">
        <div class="container">
            <div class="text-side">
                <div class="logo-img"></div>
                <p>Avec Groupomania, restez en contact avec vos collegues et amis</p>
            </div>
            <div class="form-side">
                <form class="form">
                    <input type="email" placeholder="Entrez votre email">
                    <input type="password" placeholder="Entrez votre mot de passe">
                    <button class="btn">S'inscrire</button>
                </form>
            </div>
            <router-link id="to-signup" to="/">Je veux m'incrire</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/login';
</style>