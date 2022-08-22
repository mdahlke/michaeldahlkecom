<script setup lang="ts">
defineProps({
  sm: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <code class="code-pill" :class="{ sm }">
    <slot></slot>
  </code>
</template>

<style scoped lang="scss">
.code-pill {
  margin: 0 3px;
  padding: 3px 6px;
  background-color: rgb(75, 75, 75);
  border-radius: 4px;
  white-space: nowrap;

  &.sm {
    font-size: 85%;
    margin: 0 1.5px;
    padding: 1.5px 3px;
  }
}
</style>