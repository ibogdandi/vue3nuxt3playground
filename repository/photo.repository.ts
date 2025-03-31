import type { $Fetch } from "ofetch";
export default class PhotoRepository {
    api: $Fetch;

    constructor(api: $Fetch) {
        this.api = api;
    }
    async getAll() {
        return this.api('photos');
    }
}