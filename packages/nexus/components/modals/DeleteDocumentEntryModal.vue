<script setup lang="ts">
type Props = {
  isOpen: boolean;
};
defineProps<Props>();

const emit = defineEmits(["close", "confirm-document-entry-delete"]);
</script>

<template>
  <UIModal :isOpen title="Are you sure?" @close="emit('close')">
    <template #content>
      <p>Are you sure you want to delete this document?</p>
    </template>

    <template #cta>
      <div class="flex justify-between">
        <UIButton
          variant="danger"
          type="button"
          @click="emit('confirm-document-entry-delete')"
          >Delete</UIButton
        >
        <UIButton variant="outline" type="button" @click="emit('close')"
          >Cancel</UIButton
        >
      </div>
    </template>
  </UIModal>
</template>
