<script setup lang="ts">
import Badge from "../components/Badge.vue";

type Props = {
  label: string;
  description?: string;
  // TODO: rename this to `of`
  of: "string" | "number" | "boolean" | "object";
  min?: number;
  max?: number;
};
defineProps<Props>();

const model = defineModel<string[]>({ required: true });

function addItem() {
  model.value = [...model.value, ""]; // Add empty string for new item
}

function deleteItem(index: number) {
  model.value = model.value.filter((_, i) => i !== index);
}

// TODO: this will accept slots
// Make a counter for the number of items in the list
// Create an handleClick method to increment the counter using min and max as constraints
// Badge should show the number of items in the list
// We should also have an array of elements to store the list items and being able to remove them
// formData model will probably work just fine for this out of the box
</script>

<template>
  <div
    class="border border-zinc-400 p-4 max-w-lg bg-zinc-700"
    v-if="of === 'string'"
  >
    <div class="flex items-baseline">
      <label class="text-sm font-bold" v-text="label" />
      <Badge
        :status="
          (min && model.length < min) || (max && model.length > max)
            ? 'warning'
            : 'info'
        "
        >{{ model.length }} items</Badge
      >
    </div>

    <p v-if="description" class="text-sm text-gray-300">{{ description }}</p>

    <div class="mt-1 flex flex-col gap-y-3">
      <!-- TODO: handle iteration with v-for here and inject a single input as slot -->
      <div
        v-for="(_, index) in model"
        :key="index"
        class="flex items-center bg-white h-9"
      >
        <input
          :class="['bg-white text-gray-900 w-full py-1.5 px-2.5 shadow-sm']"
          :of
          v-model="model[index]"
        />
        <button
          @click="deleteItem(index)"
          class="shrink-0 px-2.5 block text-red-500 h-full text-sm border-l border-gray-300"
        >
          Delete
        </button>
      </div>

      <button @click="addItem" class="h-9 w-full border border-dashed text-sm">
        Add item
      </button>
    </div>
  </div>
</template>
