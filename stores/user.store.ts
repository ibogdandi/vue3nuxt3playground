import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', () => {

    const user = ref<null | User>(null);

    async function fetchUser() {
        setTimeout(() => {
            user.value = {name: 'John Doe'};
        }, 2000);
    }

    return {
        user,
        fetchUser
    };
})

interface User {
    name: string;
}
