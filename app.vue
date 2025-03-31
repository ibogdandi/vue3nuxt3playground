<script setup lang="ts">
import {useUserStore} from "~/stores/user.store";
import {useTestStore} from "~/stores/test.store";

const userStore = useUserStore();
const testStore = useTestStore();

const {$photoRepository, $albumRepository, $albumRepository2} = useNuxtApp();
const {data} = await useAsyncData(() => $photoRepository.getAll());

async function getAlbumName(albumId: number) {
  const data = await $albumRepository.get(albumId);
  console.log('repo1', data);
  const data2 = await $albumRepository2.get(albumId);
  console.log('repo2', data2);
}

async function increment() {
  testStore.add(1).then(() => {
    console.log('incremented');
  });
}

async function incrementX10() {
  Promise.all([
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
    testStore.add(1),
  ]).then(() => {
    console.log('incremented 10 times');
  });
}

</script>
<template>
  <div>
    <NuxtRouteAnnouncer/>
    <div>TEST STORE VALUE = {{ testStore.count }}
      <button @click="increment">CLICK TO INCREMENT</button>
      <button @click="incrementX10">CLICK TO INCREMENT 10 TIMES</button>
    </div>

    <ClientOnly fallbackTag="div">
      <div v-if="!userStore.user">
        NO USER YET
      </div>
      <div v-else>
        USER: {{ userStore.user.name }}
      </div>
      <template #fallback>
        NO USER YET
      </template>
    </ClientOnly>
    <div v-if="data">
      <ul>
        <li v-for="photo in data">
          <p>{{ photo.albumId }}</p>
          <p>{{ photo.title }}</p>
          <p>{{ photo.url }}</p>
          <button @click="getAlbumName(photo.albumId)">CHECK NAME</button>
        </li>
      </ul>
    </div>
  </div>
</template>
