import {defineStore} from "pinia";
import {useTaskQueueStore} from "~/stores/task-queue.store";

export const useTestStore = defineStore('testStore', () => {

    const count = ref(0);

    const taskQueueStore = useTaskQueueStore();

    function add(number: number) {
        return taskQueueStore.addTask({taskFunction: doAddNumber, taskParameter: number}).then(() => {
            console.log('Task done')
        });
    }

    async function doAddNumber(number: number) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        count.value += number;
    }

    return {
        count,
        add
    };
})