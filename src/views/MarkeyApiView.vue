<script setup lang="ts">
import BurnRisk from '@/components/BurnRisk.vue';
import UVIndex from '@/components/UVIndex.vue';
import AirQuality from '@/components/AirQuality.vue';
</script>

<template>
	<section class="markey-api">
		<div class="markey-api__wrap">
			<BurnRisk />
			<UVIndex />
			<AirQuality />
		</div>
	</section>
</template>

<style scoped lang="scss">
.markey-api {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  height: 100%;
  width: 100%;
  z-index: 99;
}

.markey-api__wrap {
  display: flex;
  flex-direction: column;
  height: 100%;

  > * {
	flex: 1 1 100%;
	position: relative;
  }
}
</style>
