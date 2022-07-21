<script setup>
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';
import {  toFormValidator } from '@vee-validate/zod';
import { useRouter } from 'vue-router';
import { createUser } from '../shared/services/user.service';


const router = useRouter()

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
const { handleSubmit,setErrors, setFieldError } = useForm({
   validationSchema
})

// fonction d'inscription
const signup = handleSubmit(async (formValue, { resetForm }) => {
   try {
    // creation d'un utilisateur
     await createUser(formValue);

    //  redirection vers la page de connexion
    router.push('/login');

   } catch (e) {
    console.log(e);
    setErrors({
            firstName: e.errors.firstName,
            lastName: e.errors.lastName,
            email: e.errors.email,
            password: e.errors.password
    })
   } 
})

// acpture des saissie de l'utilisateur et verification
const { value: firstNameValue, errorMessage: firstNameError } = useField('firstName');
const { value: lastNameValue, errorMessage: lastNameError } = useField("lastName");
const { value: emailValue, errorMessage: emailError } = useField('email');
const { value: passwordValue, errorMessage: passwordError} = useField('password');
</script>

<template>
    <div class="signup-page">
        <div class="container">
            <div class="text-side">
                <div class="logo-img"></div>
                <p>Avec Groupomania, restez en contact avec vos collegues et amis</p>
            </div>
            <div class="form-side">
                <form class="form" @submit="signup">
                    <!-- Prenom -->
                    <input v-model="firstNameValue" type="text" placeholder="Entrez votre prénom">
                    <small v-if="firstNameError">{{ firstNameError }}</small>

                    <!-- Nom -->
                    <input v-model="lastNameValue" type="text" placeholder="Entrez votre nom">
                    <small v-if="lastNameError">{{ lastNameError }}</small>

                    <!-- email -->
                    <input v-model="emailValue" type="text" placeholder="Entrez votre email">
                    <small v-if="emailError">{{ emailError }}</small>

                    <!-- Password -->
                    <input v-model="passwordValue" type="password" placeholder="Entrez votre mot de passe">
                    <small v-if="passwordError">{{ passwordError }}</small>
                    <button class="btn">S'inscrire</button>
                </form>
            </div>
            <router-link id="to-login" to="/login">J'ai déja un compte</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/signup';
</style>