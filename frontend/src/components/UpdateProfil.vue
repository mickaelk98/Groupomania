<script setup>
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import {  toFormValidator } from '@vee-validate/zod'
import { ref, watch } from 'vue';


// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;
console.log(auth, localUserId, userToken);


const imageFile = ref('');
const imageUrl = ref('')


// verifie les données saisie par l'utilisateur
const validationSchema = toFormValidator(z.object({
    firstName: z.string({ required_error: "Ce champ est obligatoire" })
           .regex(new RegExp("^([a-z]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$"), "Votre nom nest pas conforme")
           .max(50, "votre nom doit faire moin de 50 caractere"),
    lastName: z.string({ required_error: "Ce champ est obligatoire" })
           .regex(new RegExp("^([a-z]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$"), "Votre nom nest pas conforme")
           .max(50, "votre nom doit faire moin de 50 caractere"),
    email: z.string({ required_error: "Ce champ est obligatoire" })
            .email("Vous devez rentrez une adresse email"),
    password:z.string({ required_error: "Ce champ est obligatoire" })
            .regex(new RegExp(".*[A-Z].*"), "Votre mot de passe doit contenir au moin une majuscule")
            .regex(new RegExp(".*[a-z].*"), "Votre mot de passe doit contenir au moin une minuscule")
            .regex(new RegExp(".*\\d.*"), "Votre mot de passe doit contenir au moin un nombre")
            .regex(
                new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
                "Votre mot de passe doit contenir au moin un caractere speciale"
            )
            .min(8, "votre mot de passe doit faire au moin 8 caracteres")
}))

// acceder au donnés du formulaire a sa soumission
const { handleSubmit } = useForm({
   validationSchema
})

// fonction de modification d'un profil
const updateProfil = handleSubmit(async (formValue) => {
    try {
        let form = new FormData();
        form.append('firstName', formValue.firstName);
        form.append('lastName', formValue.lastName);
        form.append('email', formValue.email);
        form.append('description', formValue.description);
        form.append('image', imageFile);

        const response = await fetch('http://localhost:5000/api/profil/:id', {
            method: 'PUT',
            body: form,
            headers: {
                'content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken,
            }
        })

        const data = await response.json();
        console.log(data);
    } catch (e) {

    }
})

// affiche l'image séléctioné
const displayImage = (e) => {
    if (e.target.files.length === 0) {
        return
    }
    imageFile.value = e.target.files[0];

}

// verifie si l'image a change
watch(imageFile, (imageFile) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.addEventListener("load", () => {
            imageUrl.value = fileReader.result;
           
    })
})
</script>

<template>
    <form enctype="multipart/form-data">
        <div class="delete">
            <button><span><i class="far fa-times-circle"></i></span></button>
        </div>
        <input type="file" @change="displayImage" >
        <div class="img-preview" v-if="imageUrl">
            <img :src="imageUrl" alt="image du profil">
        </div>
        <input type="text" placeholder="Entrez votre prénom">
        <input type="text" placeholder="Entrez votre nom">
        <input type="text" placeholder="Entrez votre email">
        <input type="password" placeholder="Entrez votre mot de passe">
        <textarea placeholder="Votre description"></textarea>
        <button @click="updateProfil">Envoyer</button>
    </form>

</template>

<style lang="scss" scoped>
@import '../assets/sass/components/updateProfil';
</style>