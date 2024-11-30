<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main class="px-4 py-6 min-h-screen">
    <RouterView />
  </main>
  <footer class="bg-neutral text-neutral-content pb-24 pt-4 text-center">
    Felipe Richter &copy; {{ new Date().getFullYear() }}
  </footer>
</template>
