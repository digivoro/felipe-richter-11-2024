<script setup lang="ts">
import type { Pokemon } from "@/types";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { reactive } from "vue";
import { PolarArea } from "vue-chartjs";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const props = defineProps<{
  pokemon: Pokemon;
}>();

props.pokemon.stats;

const data = reactive({
  labels: props.pokemon.stats.map((stat) => stat.name.toUpperCase()),
  datasets: [
    {
      data: props.pokemon.stats.map((stat) => stat.base),
    },
  ],
});

const options = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      align: "center",
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        color: "white",
      },
    },
  },
  datasets: {
    polarArea: {
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      circular: false,
    },
  },
  scale: {
    min: 0,
    max: 100,
    ticks: {
      beginAtzero: true,
      stepSize: 25,
    },
  },
  scales: {
    r: {
      grid: {
        color: "rgba(255,255,255,0.5)",
      },
      angleLines: {
        color: "white",
      },
      ticks: {
        color: "white",
        showLabelBackdrop: false,
        font: {
          family: "monospace",
          weight: "bolder",
          size: 14,
        },
      },
    },
  },
  aspectRatio: 1.6,
};
</script>

<template>
  <PolarArea :data="data" :options="options" />
</template>
