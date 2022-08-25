<script setup lang="ts">
import { mdiOpenInNew } from '@mdi/js';
defineProps<{
  href: string;
  text?: string;
}>();
const svgPath = mdiOpenInNew;
</script>
<template>
  <v-btn color="green" :href="href" target="_blank"
    >{{ text ? text : "Visit Site" }} <v-icon>{{svgPath}}</v-icon>
  </v-btn>
</template>

<style scoped lang="scss">
.v-icon {
  padding-left: 5px;
}
</style>