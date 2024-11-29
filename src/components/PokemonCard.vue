<script setup lang="ts">
import type { Pokemon } from "@/types";

const props = defineProps<{
  pokemon: Pokemon;
}>();
</script>

<template>
  <div
    class="rounded-md p-2 h-20 text-neutral-content bg-neutral border-l-secondary border-l-8 shadow-md shadow-[rgba(0,0,0,0.4)]"
    :style="{
      backgroundImage: `url(${pokemon.sprites.front_default})`,
      backgroundSize: '8rem',
      backgroundPosition: '70% 40%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <!-- Card body -->
    <div class="h-10 flex justify-between">
      <p class="uppercase text-md font-semibold">
        {{ pokemon.name }}
      </p>
    </div>
  </div>
</template>
