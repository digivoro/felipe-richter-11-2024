<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import { storeToRefs } from "pinia";
import IconPokeball from "./icons/IconPokeball.vue";
import IconNext from "./icons/IconNext.vue";
import PaginationButton from "./icons/PaginationButton.vue";

const pokemonStore = usePokemonStore();
const { myTeam } = storeToRefs(pokemonStore);
</script>

<template>
  <nav class="w-full pb-2 px-2 fixed bottom-0 left-0 flex justify-center">
    <!-- Prev -->
    <!-- <PaginationButton class="rotate-180">
      <IconNext />
    </PaginationButton> -->

    <!-- My team -->
    <RouterLink
      to="/team"
      class="active:scale-95 active:shadow-lg active:shadow-[rgba(0,0,0,0.7)] shadow-lg shadow-[rgba(0,0,0,0.5)] transition-all"
    >
      <div
        class="flex items-center bg-error text-secondary-content px-4 py-2 h-10 rounded-t"
      >
        <div class="flex self-center">
          <IconPokeball
            v-for="n in 6"
            :key="n"
            class="size-6 transition-all duration-300 ease-out"
            :class="{
              'text-base-100 opacity-100 rotate-12': n <= myTeam.length,
              'opacity-50': n > myTeam.length,
            }"
          />
        </div>
      </div>
      <div class="h-1 bg-neutral"></div>
      <div
        class="flex items-center font-sans tracking-tighter justify-center text-md font-medium uppercase bg-base-100 text-base-content px-4 py-1 rounded-b"
      >
        <p>Go to <span class="underline underline-offset-2">my team</span></p>
      </div>
    </RouterLink>

    <!-- Next -->
    <!-- <PaginationButton>
      <IconNext />
    </PaginationButton> -->
  </nav>
</template>
