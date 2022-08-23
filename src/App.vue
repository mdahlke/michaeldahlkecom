<template>
  <v-app>
    <v-app-bar :image="headerBg">
      <template v-slot:image>
        <v-img gradient="to right top, #2b9f5e82, #f1c83c61"></v-img>
      </template>
      <v-app-bar-title class="app-title">
        <router-link to="/">Michael Dahlke</router-link>
      </v-app-bar-title>
      <v-spacer />
      <div class="main-navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/projects">Projects</router-link>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <footer id="site-footer" class="text-center">
      Michael Dahlke &copy; {{ year }}
    </footer>
  </v-app>
</template>

<script setup lang="ts">
import headerBg from "@/assets/header-bg.jpeg";

console.log({ headerBg });

const year = new Date().getFullYear();
</script>

<style scoped lang="scss">
.app-title {
  a {
    color: white;
    text-shadow: $textShadowSmall;
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
  }
}

.main-navigation {
  margin-right: 30px;
  font-size: vwclamp(18, 24, 48);
  font-weight: bold;
  text-shadow: $textShadowSmall;
  a {
    padding: 5px 10px;
    color: white;
    text-decoration: none;
  }
}

#site-footer {
  margin-top: 80px;
  padding: 10px;
  background: rgb(34, 34, 34);
  color: rgb(94, 94, 94);
  font-size: 14px;
}
</style>