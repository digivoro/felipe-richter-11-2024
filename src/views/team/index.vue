<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
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
  <div class="pt-4">
    <SectionTitle class="mb-8">My team</SectionTitle>

    <div v-if="myTeam.length === 0" class="flex flex-col items-center">
      <div class="bg-warning p-4 rounded flex items-center mb-4">
        <IconInfo class="size-5 mr-2" />
        <p class="">You don't have any Pokémons in your team!</p>
      </div>
      <p class="font-medium mb-2">Start by adding one here:</p>
      <AppButton to="/" class="bg-secondary text-secondary-content">
        <template #icon>
          <IconAdd class="size-5" />
        </template>
        Add Pokémon
      </AppButton>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <TeamPokemonCard
        v-for="pokemon in myTeam"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>
