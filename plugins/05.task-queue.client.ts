import {useTaskQueueStore} from "~/stores/task-queue.store";
import type {Pinia} from "pinia";

export default defineNuxtPlugin((nuxt) => {

    const taskQueueStore = useTaskQueueStore(<Pinia>nuxt.$pinia);

    taskQueueStore.$subscribe(() => {
        taskQueueStore.run();
    });
});