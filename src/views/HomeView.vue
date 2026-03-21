<script setup lang="ts">
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
        <p>
          I'm Michael Dahlke. I'm a Web Developer. I code things for the
          internet!
        </p>
      </v-col>

      <v-col cols="12" class="d-flex flex-wrap justify-space-around">
        <interactive-tech-stack
          title="What I'm loving:"
          :langs="['Laravel', 'Vue.js', 'Nuxt.js', 'Vuetify']"
          titlePosition="left"
        />

        <interactive-tech-stack
          title="What I'm liking:"
          :langs="['Docker', 'Digital Ocean', 'Infrastructure']"
          titlePosition="left"
        />

        <interactive-tech-stack
          title="What I Hobby:"
          :langs="['Proxmox', 'n8n', 'FileFlows', 'Media Server', 'ESP32', 'Jellyfin', 'Emby', 'TrueNAS', '3D Printing']"
          titlePosition="left"
        />

        <interactive-tech-stack
          title="What I know:"
          :langs="['PHP', 'MySQL', 'JS', 'Git', 'APIs', 'DNS', 'CI/CD', 'Linux', 'Caddy', 'Secure Coding', 'PCI Compliance', 'Unit Testing', '...' ]"
          titlePosition="left"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <small class="d-block text-center">
          (this is not an exhaustive list of everything that I've done, that
          would be too long)
        </small>
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