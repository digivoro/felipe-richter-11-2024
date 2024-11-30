<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePokemonStore } from "../stores/pokemon";
import PokemonCard from "@/components/PokemonCard.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import BottomNavBar from "@/components/BottomNavBar.vue";

const pokemonStore = usePokemonStore();
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    if (pokemonStore.pokemons.length) {
      return; // Prevent overwriting pokemons
    }
    const response = await pokemonStore.fetchPokemons();
    if (!response.ok) {
      throw new Error("There was an error ");
    }
  } catch (e: any) {
    error.value = e instanceof Error ? e.message : e;
  }
});
</script>

<template>
  <div>
    <div
      class="flex items-center text mb-4 py-2 px-4 font-medium bg-info rounded shadow-[rgba(0,0,0,0.2)] shadow-md"
    >
      <IconInfo class="size-4 mr-2" />
      Select your Pokémon team from the list
    </div>
    <PokemonCard
      v-for="pokemon in pokemonStore.pokemons"
      :key="pokemon.id"
      class="mb-6"
      :pokemon="pokemon"
    />
  </div>

  <BottomNavBar />
</template>
