<script setup>
import TheHeader from '../components/TheHeader.vue';
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



</script>

<template>
    <TheHeader />
    <div class="container">
        <form @submit="updatePost">
            <div class="user-info">
                <div class="name-img">
                    <img :src="userStore.$state.user.image" alt="photo de profil">
                    <p>{{ userStore.$state.user.firstName }} {{ userStore.$state.user.lastName }}</p>
                </div>
                <span>{{ Date(postStore.$state.posts.timestamp).split('GMT')[0]  }}</span>
            </div>
            <div class="img-preview" v-if="imageUrl">
                <img :src="imageUrl" alt="image du post">
            </div>
            <input type="file" @change="displayImage">
            <textarea placeholder="Entrez votre message"></textarea>
            <button>Sauvegarder</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/updatePost';
</style>