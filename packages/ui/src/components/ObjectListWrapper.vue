<script setup lang="ts">
import Badge from "../components/Badge.vue";

type ObjectField = Record<string, any> & { type: "object" };

type Props = {
  label: string;
  description?: string;
  disabled: boolean;
  of: ObjectField;
  min?: number;
  max?: number;
  errors?: Record<string, string> | null;
};
const props = defineProps<Props>();

const model = defineModel<Record<string, any>[]>({ required: true });

function addItem() {
  model.value = [...model.value, {}];
}
function deleteItem(index: number) {
  model.value = model.value.filter((_, i) => i !== index);
}

const itemErrors = (index: number) => {
  if (!props.errors) return null;
  const errs: Record<string, string> = {};
  for (const [key, value] of Object.entries(props.errors)) {
    if (key.includes(`[${index}]`)) {
      const field = key.split(".")[1];
      errs[field] = value;
    }
  }
  return errs;
};
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-y-3 border border-gray-700 p-4">
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

    <!-- :class="[ -->
    <!--   errors && -->
    <!--     errors.find((error) => error.includes(`[${index}]`)) && -->
    <!--     'border-2 border-red-500', -->
    <!--   // 'mt-1 flex h-9', -->
    <!-- ]" -->

    <div v-for="(_, index) in model" :key="index">
      <div class="flex flex-col gap-y-2">
        <slot name="item" :index :errors="itemErrors(index)" />
      </div>

      <!-- <button -->
      <!--   :disabled -->
      <!--   type="button" -->
      <!--   @click="deleteItem(index)" -->
      <!--   :class="[ -->
      <!--     disabled && 'cursor-not-allowed opacity-50', -->
      <!--     'flex w-fit shrink-0 items-center border-l border-gray-300 bg-gray-50 px-3 py-2 text-sm text-red-500', -->
      <!--   ]" -->
      <!-- > -->
      <!--   Delete -->
      <!-- </button> -->
    </div>

    <button
      :disabled
      type="button"
      @click="addItem"
      :class="[
        disabled && 'cursor-not-allowed opacity-50',
        'h-9 w-full border border-dashed border-gray-700 text-sm',
      ]"
    >
      Add item
    </button>
  </div>
</template>
