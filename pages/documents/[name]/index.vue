<script setup lang="ts">
const { params } = useRoute();

const documentName =
  typeof params.name === "string" ? params.name : params.name[0];

const list = await $fetch("/api/documentsList", {
  method: "POST",
  body: {
    documentName,
  },
});

const selected = ref([list[0]]);

// const query = ref("");

// const filteredRows = computed(() => {
//   if (!query.value) {
//     return list;
//   }
//
//   return list.filter((elem) => {
//     return Object.values(elem).some((value) => {
//       return String(value).toLowerCase().includes(query.value.toLowerCase());
//     });
//   });
// });
</script>

<template>
  <!-- <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"> -->
  <!--   <UInput v-model="query" placeholder="Filter document..." /> -->
  <!-- </div> -->

  <section class="w-full">
    <header class="p-4 border-b border-gray-200 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="`${capitalize(documentName)} list`" />
      <UButton
        :to="`/documents/${documentName}/add`"
        size="xs"
        icon="heroicons:pencil-square"
        color="gray"
        >Add a new {{ documentName }}</UButton
      >
    </header>

    <div v-if="list.length" class="px-4 py-2">
      <UTable v-model="selected" :rows="list" />
    </div>
  </section>
</template>
