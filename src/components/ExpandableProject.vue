<script setup lang="ts">
import ExternalLink from "@/components/ExternalLink.vue";
import CodePill from "@/components/CodePill.vue";
import { computed, ref, watchEffect, useSlots } from "vue";

defineProps<{
  title: string;
  url?: string;
  techStack: Array<string>;
  image: string;
}>();

const slotRef = ref(null);
const contentVisible = ref(false);
const slots = useSlots();

const excerpt: string = slots
  .default()[0]
  .children.map((e) => e.children)
  .join("")
  .slice(0, 115);
</script>

<template>
  <v-card class="expandable-project">
    <v-img :src="image" />

    <v-card-title>
      <h3 class="title-pop">{{ title }}</h3>
    </v-card-title>
    <template v-if="!contentVisible">
      <v-card-text>
        <p>{{ excerpt }}...</p>
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="cyan accent-4"
          @click="contentVisible = !contentVisible"
        >
          More
        </v-btn>
        <v-spacer />
        <external-link :href="url" />
      </v-card-actions>
    </template>

    <v-expand-transition>
      <v-card
        v-if="contentVisible"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <slot ref="slotRef" class="ep__content"></slot>

          <p class="tech-stack__label">Tech Stack</p>
          <ul class="tech-stack">
            <li v-for="item in techStack">
              <code-pill>{{ item }}</code-pill>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="cyan accent-4" @click="contentVisible = false">
            Close
          </v-btn>
          <v-spacer />
          <external-link :href="url" />
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<style scoped lang="scss">
.expandable-project {
  margin: 0 auto vwclamp(30, 60);
  max-width: 600px;

  &:first-of-type {
    margin-top: 30px;
  }
}

.tech-stack {
  list-style: none;

  li {
    margin-bottom: 0.8em;
  }
}

.tech-stack__label {
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: vwclamp(20, 24);
}

.white--text {
  color: var(--v-primary-base);
}

.v-card-text {
  font-size: 20px;
  line-height: normal !important;
}

.title-pop {
  text-shadow: textShadow(rgb(0, 0, 0), 0.75);
}
</style>
