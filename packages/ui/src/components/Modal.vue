<script setup lang="ts">
import { X } from "lucide-vue-next";
import { computed, ref, useId } from "vue";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { onClickOutside } from "@vueuse/core";
import Button from "./Button.vue";

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
</script>

<template>
  <Teleport :disabled="!isOpen" to="body">
    <Transition>
      <div
        v-if="isOpen"
        class="fixed inset-0 z-10 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="emit('close')"
          aria-hidden
        />

        <UseFocusTrap class="content">
          <div
            ref="modalRef"
            :class="[
              fullscreen && 'h-screen md:h-fit',
              'relative bg-gray-900 w-full max-w-md border border-gray-700 flex flex-col z-20',
            ]"
            :aria-labelledby="modalId"
            role="dialog"
          >
            <header
              class="flex justify-between items-center gap-x-8 p-4 border-b border-gray-700"
            >
              <h2 class="uppercase" :id="modalId" v-text="title" />

              <button
                aria-label="Close"
                @click="emit('close')"
                class="text-xs focus:bg-gray-700 p-1"
              >
                <X aria-hidden :size="20" />
              </button>
            </header>

            <div class="p-4">
              <slot name="content" />
            </div>

            <footer
              v-if="slots.cta"
              class="p-4 border-t border-gray-700 mt-auto"
            >
              <Button>
                <slot name="cta" />
              </Button>
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
