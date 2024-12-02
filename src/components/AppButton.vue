<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from "vue-router";

const props = defineProps<{
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
}>();
</script>

<template>
  <button
    v-if="!to"
    class="rounded-full px-4 py-2 uppercase text-md font-bold flex items-center justify-center"
  >
    <div v-if="$slots.icon" class="mr-2">
      <slot name="icon"></slot>
    </div>
    <slot />
  </button>
  <RouterLink
    v-else
    class="rounded-full px-4 py-2 uppercase text-md font-bold flex items-center justify-center"
    :to="to"
  >
    <div class="mr-2">
      <slot name="icon"></slot>
    </div>
    <slot />
  </RouterLink>
</template>
