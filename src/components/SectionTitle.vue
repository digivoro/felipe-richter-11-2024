<script setup lang="ts">
import IconPokeball from "./icons/IconPokeball.vue";
</script>

<template>
  <div
    class="flex items-center gap-1 bg-neutral rounded mb-4 px-2 shadow-md shadow-[rgba(0,0,0,0.4)]"
  >
    <IconPokeball class="size-4 text-secondary" />
    <h2 class="text-lg uppercase font-black text-neutral-content">
      <slot />
    </h2>
  </div>
</template>
