<script setup>
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';
import {  toFormValidator } from '@vee-validate/zod';
import { useRouter } from 'vue-router';


const router = useRouter()

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
    console.log(formValue);
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formValue),
        headers: {
            'content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);

    //* si la connexion a été reussi
    if (response.ok) {
        // recuperation de l'id et du token
        const auth = {
            userId: data.userId,
            token: data.token,
            userStatus: data.userStatus
        }

        // ajout de l'id et du token dans le local storage
        localStorage.setItem("auth", JSON.stringify(auth))
        console.log("connexion reussie");
        router.push('/home')
        resetForm();
    } 
    else {
        setErrors({
            email: data.email,
            password: data.password
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
                    <button class="btn">S'inscrire</button>
                </form>
            </div>
            <router-link id="to-signup" to="/">Je veux m'incrire</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/pages/login';
</style>