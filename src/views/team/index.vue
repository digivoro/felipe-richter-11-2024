<script setup lang="ts">
import IconAdd from "@/components/icons/IconAdd.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import TeamPokemonCard from "@/components/TeamPokemonCard.vue";
import { usePokemonStore } from "@/stores/pokemon";
import { storeToRefs } from "pinia";

const pokemonStore = usePokemonStore();
const { myTeam } = storeToRefs(pokemonStore);
</script>
<template>
  <div>
    <SectionTitle class="mb-8">My team</SectionTitle>

    <div v-if="myTeam.length === 0" class="flex flex-col items-center">
      <div class="bg-warning p-4 rounded flex items-center mb-4">
        <IconInfo class="size-5 mr-2" />
        <p class="">You don't have any Pokémons in your team!</p>
      </div>
      <p class="font-medium mb-2">Start by adding one here:</p>
      <RouterLink
        to="/"
        class="bg-secondary text-secondary-content flex items-center w-max rounded-full p-4"
      >
        <IconAdd class="size-5 mr-2" />
        <div class="uppercase text-xs">Add Pokémon</div>
      </RouterLink>
    </div>
    <TeamPokemonCard
      v-for="pokemon in myTeam"
      :key="pokemon.id"
      :pokemon="pokemon"
      class="mb-8"
    />
  </div>
</template>
