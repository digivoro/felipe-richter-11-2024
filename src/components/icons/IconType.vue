<script setup lang="ts">
import { computed } from "vue";

const { type } = defineProps<{
  type: string;
}>();

const url = computed(() => `/src/assets/icons/pokemon-types/${type}.svg`);
</script>

<template>
  <img :src="url" />
</template>
