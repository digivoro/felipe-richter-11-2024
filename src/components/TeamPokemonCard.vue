<script setup lang="ts">
import type { Pokemon } from "@/types";
import StatsChart from "./StatsChart.vue";
import IconSound from "./icons/IconSound.vue";
import IconMore from "./icons/IconMore.vue";
import IconAdd from "./icons/IconAdd.vue";
import { usePokemonStore } from "@/stores/pokemon";
import { capitalize, computed, ref } from "vue";
import TypeBadge from "./TypeBadge.vue";
import AppButton from "./AppButton.vue";

const props = defineProps<{ pokemon: Pokemon }>();

const pokemonStore = usePokemonStore();

function onRemoveFromMyTeam() {
  pokemonStore.removeFromMyTeam(props.pokemon);
}

const capitalizedTypes = computed(() => props.pokemon.types.map(capitalize));

// Handle cry
// TODO: Composable!
const audio = ref<HTMLAudioElement | null>(null);
function onPlayCry() {
  try {
    if (audio.value) {
      audio.value.play();
    }
  } catch (e) {
    console.error("Error playing audio:", e);
    // TODO: Notify error
  }
}
</script>

<template>
  <div>
    <div
      class="bg-neutral text-neutral-content shadow-lg shadow-[rgba(0,0,0,0.4)] rounded-tl-[3rem] rounded-lg pb-4"
    >
      <div class="flex relative justify-end">
        <div class="absolute -top-6 left-6">
          <img :src="pokemon.sprite" class="scale-125" />
        </div>

        <div
          class="flex flex-col gap-1 items-end bg-secondary w-full rounded-tl-[3rem] rounded-tr-lg py-1 px-4"
        >
          <!-- ID + Name -->
          <div class="flex items-center text-3xl italic">
            <div class="uppercase text-secondary-content font-bold mr-1">
              #{{ pokemon.id }}
            </div>
            <div class="uppercase font-bold">
              {{ pokemon.name }}
            </div>
          </div>

          <!-- Types -->
          <div class="flex justify-start gap-1">
            <TypeBadge
              v-for="(type, i) in pokemon.types"
              :key="type"
              :type="type"
            />
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="h-44 flex justify-center">
        <StatsChart :pokemon="pokemon" />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-center px-4 gap-2 -mt-6">
      <AppButton class="bg-secondary" @click="onRemoveFromMyTeam">
        <IconAdd class="size-5 mr-2 rotate-45" />
        Remove
      </AppButton>
      <AppButton class="bg-success text-white" @click="onPlayCry">
        <template #icon>
          <IconSound class="size-6 mr-2" />
        </template>
        <audio ref="audio" :src="pokemon.cry" />
        Cry
      </AppButton>
      <AppButton class="bg-info" :to="`/team/${pokemon.id}`">
        <template #icon>
          <IconMore class="size-6 mr-2" />
        </template>
        Details
      </AppButton>
    </div>
  </div>
</template>
