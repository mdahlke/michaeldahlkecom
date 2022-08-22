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
  margin-bottom: vwclamp(60, 120);
}

.its-title {
  position: relative;
  top: 20px;
  margin-top: 30px;
  font-weight: bold;
  font-size: vwclamp(24, 30);
}

.tech-item {
  font-weight: bold;
  transform: $skewRight;
  font-size: 80px;
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
    top: 20px;
    margin-top: 30px;
    margin-left: 270px;
    transform: rotate(10deg);

    &.left {
      margin-left: -270px;
      transform: rotate(-10deg);
    }
  }
}
@media (max-width: 629px) {
  .its-title {
    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
  }
}
</style>