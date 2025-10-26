<script setup lang="ts">
import { Minus, Plus } from "lucide-vue-next";
import { ref } from "vue";

type Props = {
  title?: string;
};
defineProps<Props>();
const isOpen = ref(false);
</script>

<template>
  <div class="flex flex-col">
    <button
      class="flex items-center justify-center gap-1 py-2 text-sm"
      type="button"
      @click="isOpen = !isOpen"
    >
      {{ title ?? "Item" }}

      <Minus v-if="isOpen" :size="14" />
      <Plus v-else :size="14" />
    </button>

    <Transition name="content">
      <div v-if="isOpen" class="grid overflow-hidden px-4">
        <div class="min-h-0">
          <slot name="content" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.content-enter-active,
.content-leave-active {
  transition: grid-template-rows 300ms ease;
}

.content-enter-from,
.content-leave-to {
  grid-template-rows: 0fr;
}

.content-enter-to,
.content-leave-from {
  grid-template-rows: 1fr;
}
</style>
