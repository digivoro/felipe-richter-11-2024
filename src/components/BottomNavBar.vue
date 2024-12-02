<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import { storeToRefs } from "pinia";
import IconPokeball from "./icons/IconPokeball.vue";
import IconNext from "./icons/IconNext.vue";
import PaginationButton from "./PaginationButton.vue";
import { computed } from "vue";

const pokemonStore = usePokemonStore();
const { myTeam, isMyTeamFull, currentPage, lastPage } =
  storeToRefs(pokemonStore);
</script>

<template>
  <nav class="w-full pb-2 px-2 fixed bottom-0 left-0 flex justify-between">
    <!-- Prev -->
    <PaginationButton
      @click="$emit('change-page', 'prev')"
      :disabled="currentPage <= 1"
    >
      <template #icon>
        <IconNext class="rotate-180" />
      </template>
      PREV
    </PaginationButton>

    <!-- My team -->
    <RouterLink
      to="/team"
      class="active:scale-95 active:shadow-lg active:shadow-[rgba(0,0,0,0.7)] shadow-lg shadow-[rgba(0,0,0,0.5)] transition-all"
      :class="{
        'animate-bounce': isMyTeamFull,
      }"
    >
      <div
        class="flex items-center bg-error text-secondary-content px-4 py-2 h-10 rounded-t"
      >
        <div class="flex self-center">
          <IconPokeball
            v-for="n in 6"
            :key="n"
            class="size-6 transition-all duration-500 ease-out"
            :class="{
              'text-base-100 opacity-100': n <= myTeam.length,
              'animate-spin-slow': n <= myTeam.length && !isMyTeamFull,
              'opacity-50': n > myTeam.length,
            }"
          />
        </div>
      </div>
      <div class="h-1 bg-neutral"></div>
      <div
        class="flex items-center justify-center text-md font-medium uppercase bg-base-100 text-base-content px-4 py-1 rounded-b"
      >
        My team
      </div>
    </RouterLink>

    <!-- Next -->
    <PaginationButton
      @click="$emit('change-page', 'next')"
      :disabled="currentPage === lastPage"
    >
      <template #icon>
        <IconNext />
      </template>
      NEXT
    </PaginationButton>
  </nav>
</template>
