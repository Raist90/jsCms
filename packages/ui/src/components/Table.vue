<script setup lang="ts">
type Props = {
  columns: string[];
  rows: Record<string, string>[];
};
defineProps<Props>();
</script>

<template>
  <section class="flex flex-col gap-y-4 overflow-x-auto p-4">
    <table class="table-auto border-collapse border border-gray-700 text-sm">
      <thead class="text-left">
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            class="border border-gray-700 p-2"
            v-text="column"
          />
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td
            v-for="(val, index) in row"
            :key="index"
            class="border border-gray-700 p-2"
            v-text="val"
          />
        </tr>
      </tbody>
    </table>
  </section>
</template>
