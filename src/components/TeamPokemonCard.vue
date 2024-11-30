<script setup lang="ts">
import type { Pokemon } from "@/types";

const props = defineProps<{ pokemon: Pokemon }>();
</script>

<template>
  <div class="bg-neutral text-neutral-content rounded p-4 mt-6 flex relative">
    <div class="absolute -top-6 object-cover">
      <img :src="pokemon.sprite" />
    </div>
    <div class="uppercase text-sm font-bold mt-10 w-32">
      #{{ pokemon.id }}
      <div>{{ pokemon.name }}</div>
    </div>

    <div class="flex">
      <div class="uppercase text-xs">Types</div>
      <div v-for="type in pokemon.types">
        {{ type }}
      </div>
    </div>
  </div>
</template>
