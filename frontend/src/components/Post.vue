<script setup>
import { usePosts } from '../shared/stores/postStore';


// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userStatus = auth.userStatus;
const userToken = auth.token;

// recuperation du store
const postStore = usePosts()
postStore.getAllPosts()

</script>

<template>
    <div class="post" v-for="post in postStore.posts" :key="post._id">
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
        <img :src="post.image" alt="image du post" class="post-image" v-if="!post.image">

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
        <div class="all-comment" v-for="comment in postStore.posts.comments">
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