import type {$Fetch} from "ofetch";
import {QueryClient} from "@tanstack/vue-query";

export default class AlbumRepository {
    api: $Fetch;
    queryClient: QueryClient;

    constructor(api: $Fetch, queryClient?: QueryClient) {
        this.api = api;

        if (queryClient) {
            this.queryClient = queryClient;
        } else {
            this.queryClient = new QueryClient({
                defaultOptions: {queries: {staleTime: 10 * 1000}},
            });
        }
    }

    get(id: number) {
        return this.queryClient.fetchQuery({
            queryKey: ['albums/' + id],
            queryFn: () => this.api('albums/' + id)
        });
    }
}