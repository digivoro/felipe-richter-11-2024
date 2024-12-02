<script setup lang="ts">
import { onMounted } from "vue";
import { usePokemonStore } from "../stores/pokemon";
import PokemonCard from "@/components/PokemonCard.vue";
import BottomNavBar from "@/components/BottomNavBar.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import { storeToRefs } from "pinia";

const pokemonStore = usePokemonStore();
const { currentPage, lastPage, pageRange } = storeToRefs(pokemonStore);

async function onChangePage(direction: "prev" | "next") {
  try {
    await pokemonStore.changePage(direction);
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  try {
    if (pokemonStore.pokemons.length) {
      return; // Prevent overwriting pokemons
    }
    const response = await pokemonStore.fetchPokemons();
    if (!response.ok) {
      throw new Error("There was an error ");
    }
  } catch (err: any) {
    console.error(err);
  }
});
</script>

<template>
  <div class="pt-4">
    <SectionTitle class="mb-2">Select your Pokémon team</SectionTitle>
    <div class="text-center uppercase mb-8 font-bold">
      Page {{ currentPage }}/{{ lastPage }}
    </div>

    <!-- Pokemon cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <PokemonCard
        v-for="pokemon in pokemonStore.pokemons.slice(
          pageRange.start,
          pageRange.end,
        )"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </div>

  <BottomNavBar @change-page="onChangePage" />
</template>
