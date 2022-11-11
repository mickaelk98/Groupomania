<script setup>
import TheHeader from '../components/TheHeader.vue';
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import {  toFormValidator } from '@vee-validate/zod'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUser } from '../shared/stores/userStore';


// recuperation du userId et du token 
const auth = JSON.parse(localStorage.getItem('auth'));
const localUserId = auth.userId;
const userToken = auth.token;



// recupere les informations sur la route actuelle
const route = useRoute();
const router = useRouter();


// recupere le store user



let imageFile = ref('');
let imageUrl = ref('');



// verifie les données saisie par l'utilisateur
const validationSchema = toFormValidator(z.object({
    firstName: z.optional(
        z.string()
           .max(50, "votre nom doit faire moin de 50 caractere")
           .regex(new RegExp("^([a-z]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$"), "Votre nom nest pas conforme")
        ),
    lastName: z.optional(
        z.string({ required_error: "Ce champ est obligatoire" })
           .regex(new RegExp("^([a-z]+(( |')[a-z]+)*)+([-]([a-z]+(( |')[a-z]+)*)+)*$"), "Votre nom nest pas conforme")
           .max(50, "votre nom doit faire moin de 50 caractere")
        ),
    email: z.optional(
        z.string({ required_error: "Ce champ est obligatoire" })
            .email("Vous devez rentrez une adresse email")
        ),
    password: z.optional(
        z.string({ required_error: "Ce champ est obligatoire" })
            .regex(new RegExp(".*[A-Z].*"), "Votre mot de passe doit contenir au moin une majuscule")
            .regex(new RegExp(".*[a-z].*"), "Votre mot de passe doit contenir au moin une minuscule")
            .regex(new RegExp(".*\\d.*"), "Votre mot de passe doit contenir au moin un nombre")
            .regex(
                new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
                "Votre mot de passe doit contenir au moin un caractere speciale"
            )
            .min(8, "votre mot de passe doit faire au moin 8 caracteres")
    )
}))


// acceder au donnés du formulaire a sa soumission
const { handleSubmit, setErrors } = useForm({
   validationSchema,
//    initialValues
})

//verification des saisie de l'utilisateur
const { value: firstNameValue, errorMessage: firstNameError} = useField('firstName');
const { value: lastNameValue, errorMessage: lastNameError} = useField('lastName');
const { value: emailValue, errorMessage: emailError } = useField('email')
const { value: passwordValue, errorMessage: passwordError } = useField('password')
const { value: descriptionValue, errorMessage: descriptionError} = useField('description')

// affiche l'image séléctioné
const displayImage = (e) => {
    if (e.target.files.length === 0) {
        return false
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


// fonction de modification d'un profil
const updateProfil = handleSubmit(async (formvalue, { resetForm }) => {
    try {
        const useStore = useUser();
       const user = await useStore.getUserProfil(route.params.userId);
       console.log(user.image);
       console.log(imageFile.value);
    
        if (formvalue.firstName === undefined) {
            console.log(user.firstName);
            formvalue.firstName = user.firstName
        }
        if (formvalue.lastName === undefined) {
            console.log(user.lastName);
            formvalue.lastName = user.lastName
        }
        if (formvalue.email === undefined) {
            console.log(user.email);
            formvalue.email = user.email
        }
        if (formvalue.password === undefined) {
            console.log(user.password);
            delete formvalue.password
        }
        if (formvalue.description === undefined) {
            console.log(user.description);
            formvalue.description = user.description
        }
        if(imageFile.value === "") {
            console.log(imageFile.value, user.image);
            formvalue.image = user.image;
        } else {
            formvalue.image = imageFile.value;
        }
      
        await useStore.updateUser(localUserId, userToken, formvalue);
        router.push(`/profil/${route.params.userId}`)
        resetForm();
    } catch (e) {
        setErrors({
            description: e.error
        })
    }
})

</script>

<template>
    <TheHeader />
    <form enctype="multipart/form-data" @submit="updateProfil">

        <!-- image -->
        <label for="image">Choisissez votre photo de profil</label>
        <input type="file" id="image" name="image" accept="image/*" @change="displayImage" >
        <div class="img-preview" v-if="imageUrl">
            <img :src="imageUrl" alt="image du profil">
        </div>

        <!-- prenom -->
        <input  id="firstName" name="firstName" v-model="firstNameValue" type="text" placeholder="Entrez votre prénom">
        <small class="errors" v-if="firstNameError">{{ firstNameError }}</small>

        <!-- nom -->
        <input id="lastName" name="lastName" v-model="lastNameValue" type="text" placeholder="Entrez votre nom">
        <small class="errors" v-if="lastNameError">{{ lastNameError }}</small>

        <!-- email -->
        <input  id="email" name="email" v-model="emailValue" type="text" placeholder="Entrez votre email">
        <small class="errors" v-if="emailError">{{ emailError }}</small>

        <!-- mot de passe -->
        <input  id="password" name="password" v-model="passwordValue" type="password" placeholder="Entrez votre mot de passe">
        <small class="errors" v-if="passwordError">{{ passwordError }}</small>

        <!-- description -->
        <textarea  id="description" name="description" v-model="descriptionValue" placeholder="Votre description"></textarea>
        <small class="errors" v-if="descriptionError">{{ descriptionError }}</small>
        <!-- <samp v-if="allError">{{ allError }}</samp> -->

        <button>Envoyer</button>
    </form>

</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/updateProfil';
</style>