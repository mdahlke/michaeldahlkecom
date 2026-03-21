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
    <div class="tech-grid">
      <div v-for="item in langs" :key="item" class="tech-item">
        {{ item }}
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.interactive-tech-stack {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
    rgba(255, 255, 255, 0.02);
  min-height: 100%;
  overflow: hidden;
  padding: 22px;
}

.its-title {
  color: #fff8eb;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 18px;

  &.left {
    text-align: left;
  }

  &.right {
    text-align: right;
  }
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-item {
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: default;
  display: inline-flex;
  font-size: 0.94rem;
  font-weight: 700;
  min-height: 38px;
  align-items: center;
  padding: 0 14px;
  transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:nth-child(3n + 1) {
    background: rgba(229, 86, 67, 0.12);
    border-color: rgba(229, 86, 67, 0.22);
    color: #ffb2a7;
  }

  &:nth-child(3n + 2) {
    background: rgba(43, 159, 94, 0.12);
    border-color: rgba(43, 159, 94, 0.22);
    color: #9df1bc;
  }

  &:nth-child(3n + 3) {
    background: rgba(241, 200, 60, 0.12);
    border-color: rgba(241, 200, 60, 0.22);
    color: #ffe99c;
  }
}
</style>
