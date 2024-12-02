<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import StatsChart from "@/components/StatsChart.vue";
import TypeBadge from "@/components/TypeBadge.vue";
import { usePokemonStore } from "@/stores/pokemon";
import type { Pokemon } from "@/types";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pokemonStore = usePokemonStore();
const { myTeam } = storeToRefs(pokemonStore);

const selectedPokemon = computed<Pokemon | undefined>(() =>
  myTeam.value.find((member) => member.id === +route.params.id),
);
</script>

<template>
  <div v-if="selectedPokemon">
    <div class="flex flex-col items-center mb-12">
      <!-- Sprite -->
      <div
        class="bg-neutral w-full flex justify-center rounded-t-[3rem] relative h-20 mt-10"
      >
        <img
          :src="selectedPokemon?.sprite"
          :alt="selectedPokemon?.name"
          class="size-40 -mt-16 absolute blur-lg mix-blend-exclusion opacity-50"
        />
        <img
          :src="selectedPokemon?.sprite"
          :alt="selectedPokemon?.name"
          class="size-40 -mt-16 z-10"
        />
      </div>

      <!-- ID + Name -->
      <div
        class="flex text-3xl uppercase font-black italic w-full justify-center gap-1 bg-secondary rounded-b px-4 py-2 shadow-md shadow-[rgba(0,0,0,0.4)]"
      >
        <p class="text-secondary-content">#{{ selectedPokemon?.id }}</p>
        <h1 class="text-neutral-content">{{ selectedPokemon?.name }}</h1>
      </div>
    </div>

    <!-- Description -->
    <div class="mb-12">
      <SectionTitle>Description</SectionTitle>
      <p>{{ selectedPokemon.description }}</p>
    </div>

    <!-- Types -->
    <div class="mb-12">
      <SectionTitle>Types</SectionTitle>

      <div class="flex gap-1">
        <TypeBadge
          v-for="type in selectedPokemon?.types"
          :key="type"
          :type="type"
        />
      </div>
    </div>

    <!-- Stats -->
    <div class="mb-12">
      <SectionTitle>Stats</SectionTitle>
      <div class="uppercase text-sm mb-4">
        <ul class="leading-tight">
          <li class="flex justify-between w-52">
            <span class="font-bold">Height:</span>
            {{ selectedPokemon.height }}
          </li>
          <li class="flex justify-between w-52">
            <span class="font-bold">Weight:</span>
            {{ selectedPokemon.weight }}
          </li>
          <li
            v-for="stat in selectedPokemon.stats"
            class="flex justify-between w-52"
          >
            <span class="font-bold">{{ stat.name }}:</span> {{ stat.base }}
          </li>
        </ul>
      </div>
      <div class="bg-neutral rounded">
        <StatsChart :pokemon="selectedPokemon" />
      </div>
    </div>

    <!-- Evolution chain -->
    <div>
      <SectionTitle>Evolution chain</SectionTitle>

      <!-- No evo chain -->
      <div v-if="selectedPokemon.evolutionChain.length === 0">
        This Pokémon does not have an evolution chain
      </div>

      <!--  -->
      <div v-else>
        <div v-for="pokemon in selectedPokemon.evolutionChain">
          {{ pokemon.name }}
        </div>
      </div>
    </div>
  </div>
</template>
