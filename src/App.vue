<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import headerBg from "@/assets/header-bg.jpeg";

const route = useRoute();
const year = new Date().getFullYear();
const routes = {
  home: [{
    path: '/',
    label: '../',
  }],
  all: [{
    path: '/projects',
    label: '/projects',
  }]
}

const contextualRoutes = computed(() => {
  return route.path === '/' ? routes.all : routes.home;
});
// watch(() => route.params.slug, fetchPage)

</script>

<template>
  <v-app>
    <v-app-bar class="site-bar" :image="headerBg">
      <template v-slot:image>
        <v-img gradient="to right top, #133121d9, #533d4ab8"></v-img>
      </template>
      <v-app-bar-title class="app-title">
        <router-link to="/">Michael Dahlke</router-link>
      </v-app-bar-title>
      <v-spacer />
      <div class="main-navigation">
        <router-link v-for="r in contextualRoutes" :key="r.path" :to="r.path">
          {{ r.label }}
        </router-link>
      </div>
    </v-app-bar>
    <v-main class="site-main">
      <router-view />
    </v-main>
    <footer id="site-footer" class="text-center">
      Michael Dahlke &copy; {{ year }}
    </footer>
  </v-app>
</template>

<style scoped lang="scss">
.site-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
}

.app-title {
  a {
    color: white;
    font-family: "Avenir Next", "Segoe UI", sans-serif;
    letter-spacing: 0.04em;
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
    text-transform: uppercase;
  }
}

.main-navigation {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 22px;
  font-size: 0.95rem;
  font-weight: 700;
  a {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    padding: 8px 14px;
    color: white;
    text-decoration: none;
  }
}

.site-main {
  padding-top: 24px;
}

#site-footer {
  margin-top: 32px;
  padding: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 10, 10, 0.88);
  color: rgba(255, 255, 255, 0.42);
  font-size: 13px;
}
</style>
