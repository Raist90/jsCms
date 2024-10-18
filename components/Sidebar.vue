<script setup lang="ts">
import type { Document } from "~/types";

defineProps<{ documents: Document[] }>();

const documentClick = ({ title }: { title: Document["title"] }) => { };
</script>

<template>
  <section>
    <nav class="p-4">
      <ul>
        <li v-for="document in documents">
          <button @onClick="documentClick(document)">
            {{ document.title }}
          </button>
        </li>
      </ul>
    </nav>
  </section>
</template>
