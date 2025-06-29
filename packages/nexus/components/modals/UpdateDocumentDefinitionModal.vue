<script setup lang="ts">
type Props = {
  isOpen: boolean;
};
defineProps<Props>();

const emit = defineEmits(["close", "confirm-document-definition-update"]);
</script>

<template>
  <UIModal :isOpen title="Are you sure?" @close="emit('close')">
    <template #content>
      <p>
        Are you sure you want to update this document definition? By doing so
        you will lose some data referenced in the old schema.
      </p>
    </template>

    <template #cta>
      <div class="flex justify-between">
        <UIButton
          variant="danger"
          type="button"
          @click="emit('confirm-document-definition-update')"
          >Update</UIButton
        >
        <UIButton variant="outline" type="button" @click="emit('close')"
          >Cancel</UIButton
        >
      </div>
    </template>
  </UIModal>
</template>
