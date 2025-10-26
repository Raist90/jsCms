<script setup lang="ts">
import Accordion from "../components/Accordion.vue";
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

// TODO: I need to type better this one
// It probably doesnt make any sense to use Nexus types
function createDefaultObject(schema: ObjectField) {
  if (schema.type === "object") {
    const obj: any = {};
    schema.fields.forEach((field: any) => {
      if (field.type === "object") obj[field.name] = createDefaultObject(field);
      // else if (field.type === "array") obj[field.name] = []; // test this one
    });
    return obj;
  }
  return {};
}

function addItem() {
  model.value = [...model.value, createDefaultObject(props.of)];
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

    <div v-for="(_, index) in model" :key="index">
      <div
        :class="[
          Object.keys(errors || {}).some((key) => key.includes(`[${index}]`))
            ? 'border-red-500'
            : 'border-gray-700',
        ]"
        class="border"
      >
        <Accordion :title="`${of.title} ${index + 1}`">
          <template #content>
            <div class="mb-4 flex flex-col gap-y-2">
              <div class="flex flex-col gap-y-2">
                <slot name="item" :index :errors="itemErrors(index)" />
              </div>

              <div class="mt-2 flex gap-2">
                <button
                  v-if="index > 0"
                  type="button"
                  class="flex items-center border border-gray-700 px-2 text-sm"
                  @click="
                    model = [
                      ...model.slice(0, index - 1),
                      model[index],
                      model[index - 1],
                      ...model.slice(index + 1),
                    ]
                  "
                >
                  Move up
                </button>

                <button
                  v-if="index < model.length - 1"
                  type="button"
                  class="flex items-center border border-gray-700 px-2 text-sm"
                  @click="
                    model = [
                      ...model.slice(0, index),
                      model[index + 1],
                      model[index],
                      ...model.slice(index + 2),
                    ]
                  "
                >
                  Move down
                </button>

                <button
                  type="button"
                  class="flex items-center border border-gray-700 px-2 text-sm text-red-500"
                  @click="deleteItem(index)"
                >
                  Delete
                </button>
              </div>
            </div>
          </template>
        </Accordion>
      </div>
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
