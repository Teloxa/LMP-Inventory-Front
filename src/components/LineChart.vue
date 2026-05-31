<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  export default {
    props: {
      chartData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        chart: null,
      };
    },
    mounted() {
      // Registrar los componentes básicos de Chart.js
      Chart.register(...registerables);
  
      // Crear el gráfico cuando el componente se monte
      this.renderChart();
    },
    methods: {
      renderChart() {
        if (this.chart) {
          this.chart.destroy(); // Destruir el gráfico existente antes de crear uno nuevo
        }
  
        const ctx = this.$refs.chartCanvas.getContext("2d");
        this.chart = new Chart(ctx, {
          type: "line",
          data: this.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  usePointStyle: true,
                  padding: 16,
                  font: { family: "'Poppins', Arial, sans-serif", size: 12 },
                  color: "#475569",
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  color: "#94a3b8",
                  font: { size: 11 },
                  maxRotation: 45,
                  minRotation: 0,
                },
              },
              y: {
                grid: { color: "#f1f5f9" },
                ticks: {
                  color: "#94a3b8",
                  font: { size: 11 },
                },
                border: { display: false },
              },
            },
          },
        });
      },
    },
    watch: {
      chartData: {
        deep: true,
        handler() {
          this.renderChart(); // Volver a renderizar el gráfico si los datos cambian
        },
      },
    },
  };
  </script>
  
  <style scoped>
  div {
    position: relative;
    width: 100%;
    min-height: 260px;
  }

  canvas {
    max-width: 100%;
  }
  </style>
  