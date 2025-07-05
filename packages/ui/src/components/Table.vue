<script setup lang="ts">
import { ref, watch } from "vue";

type Props = {
  columns: string[];
  rows: Record<string, any>[];
};
const props = defineProps<Props>();
const selectedRow = defineModel<Props["rows"]>({ required: true });
const selectAllRows = ref(false);
watch(
  selectAllRows,
  (newValue) => {
    if (newValue) {
      selectedRow.value = props.rows;
    } else {
      selectedRow.value = [];
    }
  },
  { immediate: true },
);
</script>

<template>
  <section class="flex flex-col gap-y-4 overflow-x-auto p-4">
    <table class="table-auto border-collapse border border-gray-700 text-sm">
      <thead class="text-left">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column"
            class="border border-gray-700 p-2"
          >
            <input
              v-if="index === 0"
              type="checkbox"
              name="allSelectedRows"
              v-model="selectAllRows"
              class="mr-2"
            />
            <span v-text="column" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td
            v-for="(val, _, index) in row"
            :key="index"
            class="border border-gray-700 p-2"
          >
            <input
              v-if="index === 0"
              type="checkbox"
              name="selectedRow"
              :value="row"
              v-model="selectedRow"
              class="mr-2"
            />
            <span v-text="val" />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
