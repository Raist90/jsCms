<script setup lang="ts">
const { params } = useRoute();

const documentName =
  typeof params.name === "string" ? params.name : params.name[0];

// FIX: I'm getting an error because I'm fetching this clientside maybe
const list = await $fetch("/api/documentsList", {
  method: "POST",
  body: {
    documentName,
  },
});

const headers = Object.keys(list[0]);
const rows = list.map((elem) => Object.values(elem));
</script>

<template>
  <div v-if="list.length" class="p-4">
    <h2 v-text="`${capitalize(documentName)} list`" />
    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in headers" :key="index">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(value, keyIndex) in row" :key="keyIndex">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
