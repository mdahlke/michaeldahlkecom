<script setup lang="ts">
type Positions = "left" | "right";

defineProps<{
  langs: Array<string>;
  title: string;
  titlePosition: Positions;
}>();
</script>

<template>
  <section class="interactive-tech-stack">
    <h3 v-if="title" class="its-title" :class="titlePosition">{{ title }}</h3>
    <div v-for="item in langs" :key="item" class="tech-item">
      {{ item }}
    </div>
  </section>
</template>

<style scoped lang="scss">
$skewRight: skew(-30deg) rotate(-10deg) translate(20px, 20px);
$skewLeft: skew(30deg) rotate(10deg) translate(20px, 20px);

.interactive-tech-stack {
  flex: 1 1 100%;
  margin-bottom: vwclamp(60, 120);
  margin-top: 30px;
  width: 50%;
  max-width: 400px;

  @media (min-width: 775px) {
    flex-basis: 50%;
  }
  @media (min-width: 960px) {
    width: 100%;
  }
}

.its-title {
  position: relative;
  font-weight: bold;
  font-size: vwclamp(24, 30);
  z-index: 2;

  &.left {
    text-align: left;
    top: 20px;
  }
  &.right {
    text-align: right;
  }
}

.tech-item {
  font-weight: bold;
  transform: $skewRight;
  font-size: vwclamp(60, 120, 200);
  text-align: center;
  text-shadow: $textShadow;
  transition: transform 500ms ease-in-out;
  cursor: pointer;

  &:hover {
    transform: skew(10deg) rotate(3deg) translate(20px, 20px);
  }
}

.tech-item {
  &:nth-child(3n + 1) {
    color: $red;
  }
  &:nth-child(3n + 2) {
    color: $green;
  }
  &:nth-child(3n + 3) {
    color: $yellow;
  }
}

@media (min-width: 630px) {
  .its-title {
    transform: rotate(10deg);

    &.left {
      transform: rotate(-10deg);
    }
  }
}
</style>