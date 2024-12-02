<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
</script>

<template>
  <div>
    <div class="mb-4">
      <h1 class="text-3xl text-primary uppercase">Oops...</h1>
      <p>We couldn't find the page you're trying to reach</p>
    </div>
    <AppButton to="/" class="bg-secondary p-4"> Go back home </AppButton>
  </div>
</template>
