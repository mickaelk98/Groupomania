<script setup>
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import {  toFormValidator } from '@vee-validate/zod'
import { ref, watch } from 'vue';
import { usePosts, useUser } from '../shared/stores';

// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;

// gere l'éta des donnée
const userStore = useUser();
const postStore = usePosts();

const user =  userStore.getUserProfil(localUserId)

let imageFile = ref('');
let imageUrl = ref('');

// verifie les données saisie par l'utilisateur
const validationSchema = toFormValidator(z.object({
    text: z.optional(
        z.string()
           .max(500, "votre post doit faire moin de 500 caractere")
    )
}))

// acceder au donnés du formulaire a sa soumission
const { handleSubmit, setErrors } = useForm({
   validationSchema
})

//verification des saisie de l'utilisateur
const { value: textValue, errorMessage: textError } = useField('text');

// affiche l'image séléctioné
const displayImage = (e) => {
    if (e.target.files.length === 0) {
        return
    }
    imageFile.value = e.target.files[0];

}

// // verifie si l'image a change
watch(imageFile, (imageFile) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.addEventListener("load", () => {
            imageUrl.value = fileReader.result;
           
    })
})


// fonction de creation d'un post
const createPost = handleSubmit(async (formvalue, { resetForm }) => {
    try {
        formvalue.image = imageFile.value;
        console.log(imageFile.value);
        await postStore.createPost(userToken, formvalue)
        resetForm();
    } catch (e) {
        setErrors({
            text: e.error
        })
        console.log(e);
    }
})

</script>

<template>
    <div class="new-post">
            <form enctype="multipart/form-data" @submit="createPost">
                <div class="img-name">
                <router-link :to="`/profil/${userStore.$state.user._id}`">
                    <img :src="userStore.$state.user.image" alt="photo de profil">
                </router-link>
                    <p>{{ userStore.$state.user.firstName }} {{ userStore.$state.user.lastName }}</p>
                </div>
                <textarea v-model="textValue" placeholder="Faite un nouveaux post"></textarea>
                <small class="errors" v-if="textError" >{{ textError }}</small>
                <input type="file" @change="displayImage">
                <div class="img-preview" v-if="imageUrl">
                    <img :src="imageUrl" alt="image du profil">
                </div>
                <button class="submit-post">Poster</button>
            </form>
        </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/newPost';
</style>