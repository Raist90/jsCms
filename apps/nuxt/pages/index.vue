<script setup lang="ts">
const checked = ref(false);
</script>

<template>
  <form novalidate class="p-4 flex flex-col gap-y-4">
    <UIInput
      description="Some nice description here"
      error="Field `Title` is required"
      label="Title"
      name="test"
      required
      type="text"
    />

    <UIInput
      description="A litte description also here. Let's try to make it longer"
      label="Slug"
      name="test-slug"
      type="text"
      withButton
    />

    <UIToggle
      v-model="checked"
      description="Check this if you want the page to be indexable"
      label="Is Indexable"
      :disabled="false"
    />

    <UIInput
      description="Some other field"
      label="Text"
      name="test-text"
      type="text"
    />

    <UIButton variant="primary" type="submit">Save document</UIButton>
  </form>
</template>
