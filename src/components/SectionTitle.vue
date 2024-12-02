<script setup lang="ts">
import IconPokeball from "./icons/IconPokeball.vue";
</script>

<template>
  <div class="flex items-center mb-4 relative">
    <IconPokeball
      class="size-12 text-neutral absolute -top-5 -z-10 left-0 -rotate-12"
    />
    <div
      class="flex items-center gap-1 bg-secondary rounded px-2 py-1 ml-6 shadow-md shadow-[rgba(0,0,0,0.3)]"
    >
      <h2 class="text-lg uppercase font-black text-secondary-content">
        <slot />
      </h2>
    </div>
  </div>
</template>
