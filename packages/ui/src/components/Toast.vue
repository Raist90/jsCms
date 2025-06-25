<script setup lang="ts">
import { X } from "lucide-vue-next";
import { computed, onUnmounted, ref, useId, watch } from "vue";

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
      class="fixed bottom-0 left-1/2 z-20 mb-6 w-full max-w-[96%] -translate-x-1/2 border-l-4 border-green-500 bg-green-100 p-2 text-black md:max-w-96"
      v-if="isOpen"
      :id="toastId"
      role="dialog"
      aria-modal
    >
      <div class="flex items-center justify-between gap-x-2">
        <p class="text-sm" v-text="props.message" />

        <button
          ref="btn"
          aria-label="Close"
          @click="closeToast"
          class="rounded-lg p-1 text-xs focus:bg-green-300"
        >
          <X aria-hidden :size="20" />
        </button>
      </div>
    </div>
  </Transition>
</template>
