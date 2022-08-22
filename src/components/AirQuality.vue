<script setup type="ts">
import {ref, onMounted} from 'vue';

const aqi = ref({
    Category: {
        Number: 1,
        Name: ''
    }
});

async function load() {
    const response = await fetch('https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=53532&distance=25&API_KEY=50CFCFBA-336F-4155-BF6B-1FC5D1296C6C');
    const data = await response.json();
    const max = data.reduce(function (prev, current) {
        return (prev.AQI > current.AQI) ? prev : current
    }) //returns object

    console.log({data});
    aqi.value = max;
}

onMounted(() => {
    load();
})
</script>

<template>
	<section
		:class="`code-` + aqi.Category.Number"
		class="air-quality">
		<div class="wrap">
			<small>Air Quality:</small>
			<small class="aqi-observed">
				Observed @ {{ aqi.HourObserved }}
			</small>
			<span class="air-quality">
				{{ aqi.AQI }}
			</span>
			<small class="aqi-text">
				{{ aqi.Category.Name || '' }}
			</small>
		</div>
	</section>
</template>

<style scoped lang="scss">
.air-quality {
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

.aqi-observed {
  margin-top: -2vmin;
  font-size: 2.8vmin;
  font-family: monospace;
}

.aqi-text {
  font-size: 3vmin;
}

.code-1 {
  background-color: #00a600;
  color: #fff;
}

.code-2 {
  background-color: #ffff00;
  color: #333;
}

.code-3 {
  background-color: #ff7e00;
  color: #fff;
}

.code-4 {
  background-color: #ff0000;
  color: #fff;
}

.code-5 {
  background-color: #8f3f97;
  color: #fff;
}

.code-6 {
  background-color: #7e0023;
  color: #fff;
}
</style>
