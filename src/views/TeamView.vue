<script setup lang="ts">
import TeamPokemonCard from "@/components/TeamPokemonCard.vue";
import { usePokemonStore } from "@/stores/pokemon";
import { storeToRefs } from "pinia";

const pokemonStore = usePokemonStore();
const { myTeam } = storeToRefs(pokemonStore);
</script>
<template>
  <div>
    <h1 class="text-xl font-bold font-mono uppercase">My team</h1>
    <TeamPokemonCard
      v-for="pokemon in myTeam"
      :key="pokemon.id"
      :pokemon="pokemon"
      class="mb-2"
    />
  </div>
</template>
