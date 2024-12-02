<script setup lang="ts">
import type { Pokemon } from "@/types";
import IconType from "./icons/IconType.vue";

const { type } = defineProps<{
  type: Pokemon["types"][number];
}>();
</script>

<template>
  <div
    class="uppercase rounded-sm text-xs px-1 py-[2px] font-medium flex items-center text-white"
    :class="`bg-poke-${type}`"
  >
    <div class="mr-1 size-3">
      <IconType :type="type" />
    </div>
    {{ type }}
  </div>
</template>
