<script setup>
import { reactive } from 'vue';

// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userStatus = auth.userStatus;
const userToken = auth.token;
console.log(userStatus);

// gere l'éta des donnée
const state = reactive({
    posts: []
});

// recuperation des donnée de l'utilisateur
const getAllPost = async () => {
    const response = await fetch('http://localhost:5000/api/post/', {
        headers: {
            'content-Type': 'application/json',
        }
    });

    const posts = await response.json();
  
    if (posts) {
        if (Array.isArray(posts)) {
            state.posts = posts;
        } else {
            state.posts = [posts];
        }
    }
    console.log(state.posts);
}

getAllPost();
</script>

<template>
    <div class="post" v-for="post in state.posts" :key="post._id">
        <div class="img-name">
            <img :src="post.posterImage" alt="photo de profil">
            <p>{{ post.posterLastname }} {{ post.posterFirstname }}</p>
            <p class="post-date">{{ Date(post.timestamp).split('GMT')[0]  }}</p>
        </div>

        <!-- boutton de modification et suppression de post -->
        <div class="update-delete-btn" v-if="post.posterId === localUserId || userStatus">
            <button class="btn btn-update">Modifier</button>
            <button class="btn btn-delete">Supprimer</button>
        </div>

        <!-- image du post -->
        <img :src="post.image" alt="image du post" class="post-image" v-if="post.image">

        <!-- message du post -->
        <p>
            {{ post.text }}
        </p>

        <!-- like et commentaire -->
        <div class="like-comment">
            <span><i class="far fa-heart"></i> {{ post.likes }} likes </span>
            <span><i class="far fa-comment"></i> {{ post.comments.length }} commentaires</span>
        </div>

        <!-- mettre un commentaire -->
        <form>
            <textarea placeholder="Mettre uncommentaire"></textarea>
            <button>Envoyer</button>
        </form>

        <!-- commentaire du post -->
        <!-- <div class="all-comment" v-for="comment in state.posts.comments"> -->
        <div class="all-comment" v-for="comment in post.comments" v-if="post.comments.length > 0">
            <div class="comment-block">
                <div class="commenter-info">
                    <img :src="comment.commenterImage" alt="photo de profil" class="logo-img">
                    <p>{{ comment.commenterLastName }} {{ comment.commenterFirstName }}</p>
                </div>
                <span>{{ Date(comment.timestamp).split('GMT')[0] }}</span>
                <p class="comment">
                    {{ comment.text }}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/post';
</style>