<script setup>
import TheHeader from '../components/TheHeader.vue';
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import {  toFormValidator } from '@vee-validate/zod'
import { ref, watch } from 'vue';
import { usePosts, useUser } from '../shared/stores';
import { useRoute, useRouter } from 'vue-router';

// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;

// gere l'éta des donnée
const postStore = usePosts();

const route = useRoute();
const router = useRouter()

// recupere l'id dans l'url
const postId = route.params.postId;
const postInfo = postStore.getPostInfo(postId)



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

//* format les dates
const dateParser = (num) => {
    let options = {hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long", year: "numeric", month: "short", day: "numeric"}
    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString();
}

// rediriger sur la page des posts
const goHome = () => {
    router.push('/')
}

// fonction de modification d'un post
const update = handleSubmit(async (formvalue, { resetForm }) => {
    try {
        // si l'on modifie le post sans modifier le text
        if (formvalue.text === undefined ) {
            formvalue.text = postInfo.text
        } 
        // si l'on modifie le post sans modifier l'image
        if (imageFile.value === undefined || imageFile.value === "") {
            console.log("pas d'image");
            formvalue.image = postInfo.image
        } else {
            formvalue.image = imageFile.value
        }
        await postStore.updatePost(postInfo._id, userToken, formvalue)
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
    <TheHeader />
    <div class="container">
        <form enctype="multipart/form-data" @submit.prevent="update">
            <div class="user-info">
                <div class="name-img">
                    <img :src="postInfo.posterImage" alt="photo de profil">
                    <p>{{ postInfo.posterFirstname }} {{ postInfo.posterLastname }}</p>
                </div>
                <span>{{ dateParser(postInfo.createdAt)  }}</span>
            </div>
            <div class="img-preview" v-if="imageUrl || postInfo.image">
                <img :src="imageUrl || postInfo.image" alt="image du post">
            </div>
            <input type="file" id="image" name="image" accept="image/*" @change="displayImage">
            <textarea v-model="textValue" placeholder="Entrez votre message">{{ postInfo.text === "undefined" ? "" : postInfo.text }}</textarea>
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <button>Sauvegarder</button>
            <button @click="goHome">Annuler</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/updatePost';
</style>