import { defineStore } from 'pinia';
import { getUserProfil, login } from '../services';



export const useUser = defineStore('user', {
    state: () => ({
        user: {},
    }),
    actions: {
        async getUserProfil(userId) {
            const user = await getUserProfil(userId);
            this.user = user;
        },
        async login(data) {
            try {
                this.user = await login(data);
            } catch (e) {
                throw e;
            }
        }
    }
})