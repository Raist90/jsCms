<script setup lang="ts">
type Props = {
  columns: string[];
  rows: Record<string, string>[];
};
defineProps<Props>();
</script>

<template>
  <section class="p-4 flex flex-col gap-y-4 overflow-x-auto">
    <table class="table-auto border border-gray-700 border-collapse text-sm">
      <thead class="text-left">
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            class="p-2 border border-gray-700"
            v-text="column"
          />
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td
            v-for="(val, index) in row"
            :key="index"
            class="p-2 border border-gray-700"
            v-text="val"
          />
        </tr>
      </tbody>
    </table>
  </section>
</template>
