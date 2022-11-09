<script setup>
import { usePosts } from '../shared/stores/postStore';
import { reactive } from 'vue';

// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userStatus = auth.userStatus;
const userToken = auth.token;

const text = reactive([])

// recuperation du store
const postStore = usePosts()

// recupere tout les post
postStore.getAllPosts()

// supprime un post
const deletePost = async function(postId) {
    try {
        await postStore.deletePost(postId)
    } catch (e) {
        console.log(e);
    }
}


// liké un post
const likePost = async function(postId) { 
    try {
        postStore.likePost(postId)
    } catch (e) {
        console.log(e);
    }
}

// ajouter un commentaire
const addComment = async function(postId, data) {
    try {
        await postStore.commentPost(postId, data)
        text.length = 0
        console.log(postId);
        console.log(data);
    } catch(e) {
        console.log(e);
    }
}

//* format les dates
const dateParser = (num) => {
    let options = {hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long", year: "numeric", month: "short", day: "numeric"}
    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString();
}
</script>

<template>
    <div class="post" v-for="(post, index) in postStore.ordererPosts">
        <div class="img-name">
            <router-link :to="`/profil/${post.posterId}`">
                <img :src="post.posterImage" alt="photo de profil">
            </router-link>
            <p>{{ post.posterLastname }} {{ post.posterFirstname }}</p>
            <!-- <p class="post-date">{{  post.createdAt.split('T')[0] }} a {{  post.createdAt.split('T')[1].split('.')[0] }}</p> -->
            <!-- <p>{{ new Date(post.createdAt).toLocaleDateString('fr-FR') }}</p> -->
            <p class="post-date">{{ dateParser(post.createdAt) }}</p>
        </div>

        <!-- boutton de modification et suppression de post -->
        <div class="update-delete-btn" v-if="post.posterId === localUserId || userStatus">
            <router-link :to="`/home/editPost/${post._id}`" class="btn btn-update">Modifier</router-link>
            <!-- <button class="btn btn-update">Modifier</button> -->
            <button class="btn btn-delete" @click="deletePost(post._id)">Supprimer</button>
        </div>

        <!-- image du post -->
        <img :src="post.image" alt="image du post" class="post-image" v-if="post.image !== ''">

        <!-- message du post -->
        <p v-if="post.text !== 'undefined'">
            {{ post.text }}
        </p>

        <!-- like et commentaire -->
        <div class="like-comment">
            <span><i @click="likePost(post._id)" class="far fa-heart"></i> {{ post.likes }} likes </span>
            <span><i class="far fa-comment"></i> {{ post.comments.length }} commentaires</span>
        </div>

        <!-- mettre un commentaire -->
        <form @submit.prevent="addComment(post._id, text[index])">
            <!-- si l'on ajout un commentaire -->
            <textarea  v-model="text[index]" placeholder="Mettre uncommentaire"></textarea>
            <!-- sinon -->
            <!-- <textarea v-else @click="comment" placeholder="Mettre uncommentaire"></textarea> -->
            <button>Envoyer</button>
        </form>

        <!-- commentaire du post -->
        <!-- <div class="all-comment" v-for="comment in state.posts.comments"> -->
        <div class="all-comment" v-for="comment in post.comments">
            <div class="comment-block">
                <div class="commenter-info">
                    <img :src="comment.commenterImage" alt="photo de profil" class="logo-img">
                    <p>{{ comment.commenterLastName }} {{ comment.commenterFirstName }}</p>
                </div>
                <span>{{ dateParser(new Date(comment.timestamp).toUTCString()) }}</span>
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