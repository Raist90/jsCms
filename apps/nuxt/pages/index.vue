<script setup lang="ts">
import { Button, Input, Toggle } from "jscms-ui";

const checked = ref(false);
</script>

<template>
  <form novalidate class="p-4 flex flex-col gap-y-4">
    <Input
      description="Some nice description here"
      error="Field `Title` is required"
      label="Title"
      name="test"
      required
      type="text"
    />

    <Input
      description="A litte description also here. Let's try to make it longer"
      label="Slug"
      name="test-slug"
      type="text"
      withButton
    />

    <Toggle
      v-model="checked"
      description="Check this if you want the page to be indexable"
      label="Is Indexable"
    />

    <Input
      description="Some other field"
      label="Text"
      name="test-text"
      type="text"
    />

    <Button variant="primary" type="submit">Save document</Button>
  </form>
</template>
