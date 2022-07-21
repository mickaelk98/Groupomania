import { defineStore } from 'pinia';
import { getUserProfil, login, fetchCurrentUser } from '../services';



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
        async getUserProfil(userId) {
            const user = await getUserProfil(userId);
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
        }
    }
})