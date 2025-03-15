<script setup lang="ts">
import { computed, onUnmounted, ref, useId, watch } from "vue";
import { X } from "lucide-vue-next";

type Props = {
  isOpen: boolean;
  message: string;
  msTimeout?: number;
};
const props = defineProps<Props>();
const emit = defineEmits(["close"]);

const isOpen = computed(() => props.isOpen);

const btn = ref<HTMLButtonElement | null>(null);
const timeoutId = ref();

const closeToast = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
  emit("close");
};

watch([isOpen, btn], async ([isOpen, btn]) => {
  if (isOpen && btn) {
    btn.focus();

    if (props.msTimeout) {
      timeoutId.value = setTimeout(() => {
        emit("close");
      }, props.msTimeout);
    }
  } else {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
  }
});

onUnmounted(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
});

const toastId = useId();
</script>

<template>
  <Transition
    enterActiveClass="transition-[opacity,transform] duration-300 ease-in-out"
    leaveActiveClass="transition-[opacity,transform] duration-300 ease-in-out"
    enterFromClass="opacity-0 translate-y-10"
    leaveToClass="opacity-0 translate-y-10"
  >
    <div
      class="fixed m-6 w-full max-w-96 bottom-0 left-1/2 -translate-x-1/2 border-l-4 border-green-500 bg-green-100 text-black p-2 z-20"
      v-if="isOpen"
      :id="toastId"
      role="dialog"
      aria-modal
    >
      <div class="flex gap-x-2 justify-between items-center">
        <p class="text-sm" v-text="props.message" />

        <button
          ref="btn"
          aria-label="Close"
          @click="closeToast"
          class="text-xs focus:bg-green-300 p-1 rounded-lg"
        >
          <X aria-hidden :size="20" />
        </button>
      </div>
    </div>
  </Transition>
</template>
