<template>
    <h1>
        Bar chart
    </h1>
    <div class="container" id="barChartContainer">
        <canvas id="barChart"></canvas>
    </div>

</template>
  
<script>
import { graphBarChart } from '@/scripts/barChart.js' 

  export default {
    name: 'SampleBarChart',
    props: {
      msg: String
    },

    mounted() {
      graphBarChart();
    }

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #barChartContainer {
    width: 800px;
    height: 400px;
  }

  </style>
  