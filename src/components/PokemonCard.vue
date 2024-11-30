<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import type { Pokemon } from "@/types";
import { computed } from "vue";
import IconAdd from "./icons/IconAdd.vue";
import { storeToRefs } from "pinia";

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
      backgroundImage: `url(${pokemon.sprites.front_default})`,
    }"
    @click="onToggleFromTeam"
  >
    <!-- Card body -->
    <div class="flex justify-between h-20 items-end">
      <!-- Name -->
      <div
        class="flex flex-col ml-2 transition-all transform-gpu duration-150 uppercase"
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
      <div
        class="flex items-center transition-all transform-gpu rounded-full h-12 -mr-2 -mb-2 shadow shadow-[rgba(0,0,0,0.5)] border-b-2"
        :class="{
          'bg-success text-success-content': !isPokemonInTeam,
          'bg-error text-error-content': isPokemonInTeam,
        }"
      >
        <div
          class="uppercase flex justify-between pl-4 pr-4 items-center w-32 text-xs text-center font-bold font-mono"
        >
          <IconAdd
            v-if="isPokemonInTeam || !isMyTeamFull"
            class="size-6 transition-all"
            :class="{
              'rotate-45': isPokemonInTeam,
              'rotate-0': !isPokemonInTeam,
            }"
          />

          <div v-if="isPokemonInTeam">
            Remove <br />
            from team
          </div>
          <div v-else-if="isMyTeamFull" class="pl-6">
            Team <br />
            is full!
          </div>
          <div v-else>
            Add to <br />
            my team
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
