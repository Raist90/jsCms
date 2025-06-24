<script setup lang="ts">
import { X } from "lucide-vue-next";
import { computed, onMounted, onUnmounted, ref, useId } from "vue";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { onClickOutside } from "@vueuse/core";

type Props = {
  isOpen: boolean;
  title: string;
  fullscreen?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  fullscreen: false,
});
const isOpen = computed(() => props.isOpen);

const emit = defineEmits(["close"]);
const slots = defineSlots();

const modalId = useId();
const modalRef = ref<HTMLElement | null>(null);
onClickOutside(modalRef, () => emit("close"));

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === "Escape") emit("close");
}

onMounted(() => {
  document.addEventListener("keydown", closeOnEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", closeOnEscape);
});
</script>

<template>
  <Teleport :disabled="!isOpen" to="body">
    <Transition>
      <div
        v-if="isOpen"
        class="fixed inset-0 z-10 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/50"
          @click="emit('close')"
          aria-hidden
        />

        <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
        <UseFocusTrap class="content">
          <div
            ref="modalRef"
            :class="[
              fullscreen && 'h-screen md:h-fit',
              'relative z-20 m-1 flex w-full max-w-md flex-col border border-gray-700 bg-gray-900 md:m-0',
            ]"
            :aria-labelledby="modalId"
            role="dialog"
          >
            <header
              class="flex items-center justify-between gap-x-8 border-b border-gray-700 p-4"
            >
              <h2 class="uppercase" :id="modalId" v-text="title" />

              <button
                aria-label="Close"
                @click="emit('close')"
                class="p-1 text-xs focus:bg-gray-700"
              >
                <X aria-hidden :size="20" />
              </button>
            </header>

            <div class="p-4">
              <slot name="content" />
            </div>

            <footer
              v-if="slots.cta"
              class="mt-auto border-t border-gray-700 p-4"
            >
              <slot name="cta" />
            </footer>
          </div>
        </UseFocusTrap>
      </div>
    </Transition>
  </Teleport>
</template>

<style css scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 300ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active .content,
.v-leave-active .content {
  animation-delay: 300ms;
  transition: transform 300ms ease-out;
  transform: translateY(25%);
}

.v-enter-to .content {
  transform: translateY(0);
}
</style>
