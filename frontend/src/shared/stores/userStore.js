import { defineStore } from 'pinia';
import { getUserProfil, login, fetchCurrentUser, updateUser } from '../services';



export const useUser = defineStore('user', {
    state: () => ({
        user: null,
        loaded: false
    }),
    getters: {
        isAuthenticated(state) {
            // si l'utilisateur est connecté
            if (state.user) {
                return true;
            }
            // si l'utilisateur n'est pas conecter 
            else if (!state.user && state.loaded) {
                return false;
            } else {
                return null;
            }
        }
    },
    actions: {
        async getUserProfil(userId, userToken) {
            const user = await getUserProfil(userId, userToken);
            return user
            // this.user = user;
        },
        async login(data) {
            try {
                this.user = await login(data);
            } catch (e) {
                throw e;
            }
        },
        async fetchCurrentUser() {
            this.user = await fetchCurrentUser();
            this.loaded = true;
        },
        async updateUser(userId, userToken, data, file) {
            this.user = await updateUser(userId, userToken, data, file)
        }
    }
})