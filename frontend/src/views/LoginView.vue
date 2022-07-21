<script setup>
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';
import {  toFormValidator } from '@vee-validate/zod';
import { useRouter } from 'vue-router';
import { useUser } from '../shared/stores';


const router = useRouter()
const userStore = useUser();

const validationSchema = toFormValidator(z.object({
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
const { handleSubmit, setErrors } = useForm({
   validationSchema
})

// fonction de connexion
const login = handleSubmit(async (formValue, { resetForm }) => {
    try {
        await userStore.login(formValue);
        router.push('/home');
    } catch (e) {
        setErrors({
            email: e.email,
            password: e.password
        });
    }
})


// capture des saissie de l'utilisateur et verification
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
            <div class="form-side" @submit="login">
                <form class="form">
                    <!-- Email -->
                    <input v-model="emailValue" type="email" placeholder="Entrez votre email">
                    <small v-if="emailError">{{ emailError }}</small>

                    <!-- Password -->
                    <input v-model="passwordValue" type="password" placeholder="Entrez votre mot de passe">
                    <small v-if="passwordError">{{ passwordError }}</small>
                    <button class="btn">Se connecter</button>
                </form>
            </div>
            <router-link id="to-signup" to="/">Je veux m'incrire</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/login';
</style>