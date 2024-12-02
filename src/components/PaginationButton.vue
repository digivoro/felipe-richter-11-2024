<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button
    class="flex flex-col justify-center w-20 items-center bg-primary text-primary-content rounded-lg shadow-md shadow-[rgba(0,0,0,0.4)] transition-all duration-150"
    :class="{
      'cursor-not-allowed saturate-0': disabled,
      'active:scale-95 active:text-white cursor-pointer': !disabled,
    }"
    type="button"
    :disabled="disabled"
  >
    <div class="size-14">
      <slot name="icon" />
    </div>
    <div class="font-bold">
      <slot />
    </div>
  </button>
</template>
