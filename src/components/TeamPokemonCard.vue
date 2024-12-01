<script setup lang="ts">
import type { Pokemon } from "@/types";
import { computed } from "vue";

const props = defineProps<{ pokemon: Pokemon }>();

const typeColors = computed(() => {
  return props.pokemon.types.map((type) => "bg-poke-" + type);
});
</script>

<template>
  <div
    class="bg-neutral text-neutral-content rounded rounded-l-full p-4 mt-6 flex relative items-start"
  >
    <div class="z-10">
      <div class="absolute -top-5 left-10">
        <img :src="pokemon.sprite" class="scale-125 blur-xl absolute" />
        <img :src="pokemon.sprite" class="scale-125" />
      </div>
      <div class="uppercase text-sm font-bold mt-10 ml-4 w-32">
        #{{ pokemon.id }}
        <div>{{ pokemon.name }}</div>
      </div>
    </div>

    <div class="flex flex-col gap-1 font-mono">
      <!-- Types -->
      <div class="flex items-center">
        <p class="uppercase text-xs mr-2">Types</p>
        <div v-for="(type, i) in pokemon.types" :key="i">
          <div
            class="uppercase rounded-sm text-xs px-1 mr-1"
            :class="typeColors[i]"
          >
            {{ type }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
