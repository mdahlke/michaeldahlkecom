<script setup type="ts">
import CodePill from "@/components/CodePill.vue";
</script>
<template>
  <section class="about">
    <v-container>
      <v-row>
        <v-col>
          <h1>Who am I?</h1>
          <p>
            I know that answer, but you probably don't. I'm a human, husband,
            father, and a web developer.
          </p>
          <p>
            I have been creating things for the internet for over 8 years.
            During that time I have used many different languages and tech
            stacks which have included (but definitely not limited to):
            <code-pill>HTML</code-pill>
            <code-pill>CSS</code-pill>
            <code-pill>JS</code-pill>
            <code-pill>Vue.js</code-pill>
            <code-pill>Nuxt.js</code-pill>
            <code-pill>Vuetify</code-pill>
            <code-pill>PHP</code-pill>
            <code-pill>Laravel</code-pill>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    min-height: 100vh;
    align-items: center;
  }
}
</style>