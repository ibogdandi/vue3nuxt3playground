import {useUserStore} from "~/stores/user.store";
import type {Pinia} from "pinia";

export default defineNuxtPlugin((nuxt) => {
    const userStore = useUserStore(<Pinia>nuxt.$pinia);

    userStore.fetchUser();
});