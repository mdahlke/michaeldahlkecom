<template>
	<section
		:class="`uv-level-` + uvIndexLevel"
		class="uv-index"
	>
		<div class="wrap">
			<small>UV Index: {{ uvIndex }}</small>
			<small class="xs">
				{{ message }}
			</small>
		</div>
	</section>
</template>

<script setup type="ts">
import {ref, computed, onMounted} from 'vue';

const uvIndex = ref(0);
const messages = ref({
    'high': 'Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!',
    'medium': 'Seek shade during midday hours! Slip on a shirt, slop on sunscreen and slap on hat!',
    'low': 'You can safely enjoy being outside!'
});
const uvIndexLevel = computed(() => {
    if (uvIndex >= 8) {
        return 'high';
    } else if (uvIndex >= 3) {
        return 'medium';
    } else {
        return 'low';
    }
});
const message = computed(() => {
    if (uvIndexLevel === 'high') {
        return messages.high;
    } else if (uvIndexLevel === 'medium') {
        return messages.medium;
    } else {
        return messages.low;
    }
});
onMounted(() => {
    load();
});

async function load() {
    const lat = '43.24576';
    const lng = '-89.345753';

    const obj = {
        headers: new Headers({
            'x-access-token': 'd16fd8602c42c6c1272ee82a7050f18c'
        })
    };
    const response = await fetch('https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng, obj);
    const data = await response.json();

    uvIndex.value = Math.round(data.result.uv);
};
</script>

<style scoped lang="scss">

.uv-index {
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

small.xs {
  font-size: 4vmin;
  padding: 0 2em;
}

.uv-level-low {
  background-color: #00a600;
  color: #fff;
}

.uv-level-medium {
  background-color: #f8941d;
}

.uv-level-high {
  background-color: #ee1c24;
  color: #fff;
}
</style>
