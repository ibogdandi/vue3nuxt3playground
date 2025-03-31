import {defineStore} from 'pinia';
import { v4 as uuidV4 } from 'uuid';
export const useTaskQueueStore = defineStore('taskQueueStore', () => {

    const tasks: Ref<TaskQueueItem[]> = ref([]);
    let hasRunningTask: boolean = false;

    function addTask(task: Task) {
        return new Promise((resolve: any, reject:any) => {
            const taskId = uuidV4();
            tasks.value.push({id: taskId, task, resolve, reject});
        });
    }

    function run() {
        if (!hasRunningTask && tasks.value.length) {
            const taskItem = tasks.value[0];

            const { taskFunction, taskParameter } = taskItem.task;
            hasRunningTask = true;

            taskFunction(taskParameter)
                .then((r: any) => {
                    handleProcessedTaskItem(taskItem);
                    taskItem.resolve(r);
                })
                .catch((e: any) => {
                    handleProcessedTaskItem(taskItem);
                    taskItem.reject(e);
                });
        }
    }

    function handleProcessedTaskItem(taskItem: TaskQueueItem) {
        hasRunningTask = false;

        const taskInQueueIndex = tasks.value.findIndex(taskItemInQueue => taskItemInQueue.id === taskItem.id);
        if (taskInQueueIndex > -1) {
            tasks.value.splice(taskInQueueIndex, 1);
        }
    }

    return {
        addTask,
        run,
        tasks
    }
});

interface Task {
    taskFunction: Function;
    taskParameter: any;
}

interface TaskQueueItem {
    id: string;
    task: Task;
    resolve: any;
    reject: any;
}

