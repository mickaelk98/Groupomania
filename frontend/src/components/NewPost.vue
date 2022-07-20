<script setup>
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import {  toFormValidator } from '@vee-validate/zod'
import {  reactive, ref, watch } from 'vue';

// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;
console.log(auth, localUserId, userToken);

// gere l'éta des donnée
const state = reactive({
    user: {}
});

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
const { handleSubmit, setFieldError } = useForm({
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


// recuperation des donnée de l'utilisateur
const getUserProfil = async () => {
    const response = await fetch('http://localhost:5000/api/auth/'+ localUserId, {
        headers: {
            'content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        }
    });

    const user = await response.json();
    state.user = user;
    console.log(state.user);
}

// fonction de creation d'un post
const createPost = handleSubmit(async (formValue, { resetForm }) => {
    try {
        const fd = new FormData()
    
        fd.append('text', formValue.text)
        fd.append('image', imageFile.value)
        const response = await fetch('http://localhost:5000/api/post/',
        {
            method: 'POST',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + userToken,
            }
        });

        const post = await response.json();
        console.log(post);

        if (response.ok) {
            resetForm()
        } else {
            setFieldError('text', post.error)
        }

    } catch(e) {
        console.log(e);
    }
})

getUserProfil();
</script>

<template>
    <div class="new-post">
            <form enctype="multipart/form-data" @submit="createPost">
                <div class="img-name">
                    <img :src="state.user.image" alt="photo de profil">
                    <p>{{ state.user.firstName }} {{ state.user.lastName }}</p>
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