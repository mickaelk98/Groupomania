import { defineStore } from 'pinia';
import { getUserProfil, login, fetchCurrentUser, updateUser, deleteUser, logout } from '../services';



export const useUser = defineStore('user', {
    state: () => ({
        user: null,
        loaded: false,
        otherUser: null,
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
        },
        async login(data) {
            try {
                this.user = await login(data);
            } catch (e) {
                throw e;
            }
        },
        logout() {
            logout();
            this.user = null;
        },
        async fetchCurrentUser() {
            this.user = await fetchCurrentUser();
            this.loaded = true;
        },
        async updateUser(userId, userToken, data) {
            this.user = await updateUser(userId, userToken, data)
        },
        async deleteUser(userId, userToken) {
            this.user = await deleteUser(userId, userToken)
        },
        async getOtherUserInfo(userId) {
            this.otherUser = await getUserProfil(userId)
        }
    }
})