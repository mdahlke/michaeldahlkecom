<script setup lang="ts">

import {ref, onMounted} from "vue";

const risk = ref('');
const code = ref(0);

async function load() {
    const response = await fetch('https://dnrmaps.wi.gov/arcgis2/rest/services/FR_WIS_BURN/FR_WIS_BURN_Map/MapServer/identify?f=json&tolerance=1&returnGeometry=true&returnFieldName=false&returnUnformattedValues=false&imageDisplay=500%2C500%2C96&geometry=%7B%22x%22%3A572643.0958012957%2C%22y%22%3A297536.0605245739%7D&geometryType=esriGeometryPoint&sr=3071&mapExtent=215368.01325113064%2C173616.3246851022%2C1020041.6225983493%2C978289.934032321&layers=all%3A12');
    const data = await response.json();
    
    console.log({data});

    risk.value = data.results[0].attributes.DANGER_RATING_NAME;
    code.value = data.results[0].attributes.DANGER_RATING_CODE;
}

onMounted(() => {
    load();
});
</script>

<template>
	<section
		:class="`code-` + code"
		class="burn-risk">
		<div class="wrap">
			<small>Fire risk:</small>
			<span class="risk">
				{{ risk }}
			</span>
		</div>
	</section>
</template>

<style scoped lang="scss">
.burn-risk {
  font-weight: bold;
  font-size: 10vmin;
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);

  > * {
	flex: 1 1 100%;
  }
}

.code-1 {
  background-color: #00a600;
  color: #fff;
}

.code-2 {
  background-color: #3366ff;
  color: #fff;
}

.code-3 {
  background-color: #fff200;
}

.code-4 {
  background-color: #f8941d;
}

.code-5 {
  background-color: #ee1c24;
  color: #fff;
}
</style>
