export default defineNuxtPlugin((nuxt) => {
    const api = $fetch.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        onRequest(config) {
            console.log('Making request to ' + config.request);
        },
        onResponse(response) {
            console.log('Response from ' + response.request);
        }
    });

    return {
        provide: {
            api
        }
    }
});