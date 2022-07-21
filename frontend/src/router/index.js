import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProfilView from '../views/ProfilView.vue'
import UpdateProfil from '../views/UpdateProfil.vue'
import { useUser } from '../shared/stores'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'signup',
            component: SignupView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/profil/:userId',
            name: 'profil',
            component: ProfilView
        },
        {
            path: '/profil/:userId/update',
            name: 'UpdateProfil',
            component: UpdateProfil
        },
    ]
})

// router.beforeEach(() => {
//     const userStore = useUser();
//     if (!userStore.loaded) {
//         userStore.fetchCurrentUser();
//     }
// })


export default router
