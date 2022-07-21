import { defineStore } from 'pinia';
import { getUserProfil } from '../services/user.service';



export const useUser = defineStore('user', {
    state: () => ({
        user: {}
    }),
    actions: {
        async getUserProfil(userId) {
            const user = await getUserProfil(userId);
            this.user = user;
        }
    }

})