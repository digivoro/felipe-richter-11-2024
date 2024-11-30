<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class="bg-neutral text-neutral-content mb-20 py-4 text-center">
    Felipe Richter &copy; {{ new Date().getFullYear() }}
  </footer>
</template>
