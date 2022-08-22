<script setup lang="ts">
defineProps<{
  href: string;
  text?: string;
}>();
</script>
<template>
  <v-btn color="green" :href="href" target="_blank"
    >{{ text ? text : "Visit Site" }} <v-icon>mdi-open-in-new</v-icon>
  </v-btn>
</template>

<style scoped lang="scss">
.v-icon {
  padding-left: 5px;
}
</style>