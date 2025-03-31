import PhotoRepository from "~/repository/photo.repository";
import AlbumRepository from "~/repository/album.repository";
import type {$Fetch} from "ofetch";
import {QueryClient} from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxt) => {

    const queryClient = new QueryClient({defaultOptions: {queries: {staleTime: 5 * 1000}}});
    const photoRepository = new PhotoRepository(<$Fetch>nuxt.$api);
    const albumRepository = new AlbumRepository(<$Fetch>nuxt.$api, queryClient);
    const albumRepository2 = new AlbumRepository(<$Fetch>nuxt.$api, queryClient);

    return {
        provide: {
            photoRepository,
            albumRepository,
            albumRepository2
        }
    };
})
;