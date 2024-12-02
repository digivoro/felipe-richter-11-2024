<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import type { Pokemon } from "@/types";
import { computed } from "vue";
import IconAdd from "./icons/IconAdd.vue";
import { storeToRefs } from "pinia";
import AppButton from "./AppButton.vue";

const pokemonStore = usePokemonStore();
const { addToMyTeam, removeFromMyTeam } = pokemonStore;
const { myTeam, isMyTeamFull } = storeToRefs(pokemonStore);

const props = defineProps<{
  pokemon: Pokemon;
}>();

const isPokemonInTeam = computed(() => {
  return myTeam.value.includes(props.pokemon);
});

function onToggleFromTeam() {
  if (isPokemonInTeam.value) {
    removeFromMyTeam(props.pokemon);
    return;
  }
  addToMyTeam(props.pokemon);
}
</script>

<template>
  <div
    class="h-24 bg-no-repeat select-none rounded active:translate-y-2 active:shadow-[rgba(0,0,0,0.6)] active:shadow-md shadow-lg shadow-[rgba(0,0,0,0.3)] transition-all duration-150 ease-out"
    :class="{
      'pl-2 bg-neutral text-neutral-content [background-size:7rem] hover:[background-size:8rem] [background-position:50%_50%] hover:border-l-8 hover:border-l-accent':
        !isPokemonInTeam,
      'border-l-8 border-l-success bg-accent text-accent-content font-black [background-size:10rem] [background-position:45%_50%]':
        isPokemonInTeam,
    }"
    role="button"
    :style="{
      backgroundImage: `url(${pokemon.sprite})`,
    }"
    @click="onToggleFromTeam"
  >
    <!-- Card body -->
    <div class="flex justify-between h-20 items-end">
      <!-- Name -->
      <div
        class="flex flex-col ml-2 transition-all duration-150 uppercase"
        :class="{
          'text-3xl opacity-25 font-black text-[white] italic pokemon-name [paint-order:stroke_fill] [-webkit-text-stroke:10px_rgba(0,0,0,1)]':
            isPokemonInTeam,
          'text-lg font-bold': !isPokemonInTeam,
        }"
      >
        <p>#{{ pokemon.id }}</p>
        <p>
          {{ pokemon.name }}
        </p>
      </div>

      <!-- Button -->
      <AppButton
        class="transition-all duration-150 rounded-full h-12 -mr-2 -mb-2 shadow shadow-[rgba(0,0,0,0.5)]"
        :class="{
          'bg-error text-error-content': isPokemonInTeam,
          'bg-warning text-primary-content': !isPokemonInTeam && isMyTeamFull,
          'bg-success text-success-content': !isPokemonInTeam,
        }"
      >
        <template v-if="isPokemonInTeam || !isMyTeamFull" #icon>
          <IconAdd
            class="size-6 transition-all duration-150"
            :class="{
              'rotate-45': isPokemonInTeam,
              'rotate-0': !isPokemonInTeam,
            }"
          />
        </template>
        <template v-if="isPokemonInTeam">Remove</template>
        <template v-else-if="isMyTeamFull">Team is full!</template>
        <template v-else>Add</template>
      </AppButton>
    </div>
  </div>
</template>
