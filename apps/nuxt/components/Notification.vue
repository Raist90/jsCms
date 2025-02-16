<script setup lang="ts">
import type { UIToast } from "#components";

const { toastInitialState } = useToast();

type ToastProps = InstanceType<typeof UIToast>["$props"];
const toast = useState<ToastProps>("notification", () => toastInitialState);
</script>

<template>
  <Teleport to="body">
    <UIToast v-bind="toast" />
  </Teleport>
</template>
