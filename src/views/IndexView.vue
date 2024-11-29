<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePokemonStore } from "../stores/pokemon";
import PokemonCard from "@/components/PokemonCard.vue";

const pokemonStore = usePokemonStore();
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await pokemonStore.fetchPokemons();
    if (!response.ok) {
      throw new Error("Hubo un error ");
    }
  } catch (e: any) {
    error.value = e instanceof Error ? e.message : e;
  }
});
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="text-xl font-semibold mb-4">Lista de Pokèmons</h1>
    <template v-for="pokemon in pokemonStore.pokemons" :key="pokemon.id">
      <PokemonCard class="mb-4" :pokemon="pokemon" />
    </template>
  </div>
</template>
