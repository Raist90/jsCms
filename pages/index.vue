<script setup lang="ts">
const { result } = await cmsClient.fetch({
  documentName: "page",
  formatter: (data: { title: string; isIndexable: boolean }) => {
    if (data.title === "First page" && data.isIndexable) {
      return { title: data.title };
    }
    return;
  },
});
</script>

<template>
  <div>{{ result }}</div>
</template>
