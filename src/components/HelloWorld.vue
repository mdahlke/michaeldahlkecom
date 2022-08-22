<script setup lang='ts'>
import InteractiveTechStack from "@/components/InteractiveTechStack.vue";
</script>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!-- <v-img :src="logo" class="my-3" contain height="200" /> -->
      </v-col>

      <v-col class="mb-4" cols="12">
        <h1 class="title-text mb-3">Hey;</h1>
        <p>I'm Michael Dahlke. I'm a Web Developer</p>
      </v-col>

      <v-col cols="12">
        <interactive-tech-stack
          :langs="['Vue.js', 'Nuxt.js', 'Vuetify']"
          title="What I'm loving right now:"
          titlePosition="left"
        />

        <interactive-tech-stack
          :langs="['PHP', 'MySQL', 'HTML', 'CSS']"
          title="Other languages I like:"
          titlePosition="right"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.title-text {
  font-weight: bold;
  font-size: vwclamp(40, 100);
  text-shadow: $textShadow;
  color: var(--v-primary-base);
}
</style>
