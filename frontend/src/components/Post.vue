<script setup>
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import {  toFormValidator } from '@vee-validate/zod'
import { usePosts } from '../shared/stores/postStore';


// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userStatus = auth.userStatus;
const userToken = auth.token;

// recuperation du store
const postStore = usePosts()

// recupere tout les post
postStore.getAllPosts()

const validationSchema = toFormValidator(z.object({
    text: z.optional(
        z.string()
           .max(200, "votre post doit faire moin de 200 caractere")
    )
}))

// acceder au donnés du formulaire a sa soumission
const { handleSubmit, setErrors } = useForm({
   validationSchema
})

const { value: textValue , errorMessage: textError } = useField('text');

// supprime un post
const deletePost = async function(postId) {
    try {
        await postStore.deletePost(postId)
    } catch (e) {

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

</script>

<template>
    <div class="post" v-for="post in postStore.$state.posts" :key="post._id">
        <div class="img-name">
            <img :src="post.posterImage" alt="photo de profil">
            <p>{{ post.posterLastname }} {{ post.posterFirstname }}</p>
            <p class="post-date">{{ Date(post.timestamp).split('GMT')[0]  }}</p>
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