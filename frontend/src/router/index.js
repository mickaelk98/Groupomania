import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProfilView from '../views/ProfilView.vue'
import UpdateProfil from '../views/UpdateProfil.vue'
import UpdatePost from '../views/UpdatePost.vue'
import { useUser } from '../shared/stores'
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from '../shared/guards'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            beforeEnter: [isNotAuthenticatedGuard],
            name: 'signup',
            component: SignupView
        },
        {
            path: '/login',
            beforeEnter: [isNotAuthenticatedGuard],
            name: 'login',
            component: LoginView
        },
        {
            path: '/home',
            beforeEnter: [isAuthenticatedGuard],
            name: 'home',
            component: HomeView
        },
        {
            path: '/home/editPost/:postId',
            beforeEnter: [isAuthenticatedGuard],
            name: 'updatePost',
            component: UpdatePost
        },
        {
            path: '/profil/:userId',
            beforeEnter: [isAuthenticatedGuard],
            name: 'profil',
            component: ProfilView
        },
        {
            path: '/profil/:userId/update',
            beforeEnter: [isAuthenticatedGuard],
            name: 'UpdateProfil',
            component: UpdateProfil
        },
    ]
})

router.beforeEach(async () => {
    const userStore = useUser();
    if (!userStore.loaded) {
        await userStore.fetchCurrentUser();
    }
})


export default router
