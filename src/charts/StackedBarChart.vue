<template>
    <h1>
        Stacked bar chart 
    </h1>
    <div class="container" id="barChartContainer">
        <canvas id="barChart"></canvas>
    </div>


</template>
  
<script>
/* eslint-disable */
import { makeStackedBarChart } from '@/scripts/stackedBarChart.js' 

export default {
    name: 'StackedBarChart',

    props: {
      msg: String
    },

    mounted() {
      makeStackedBarChart();
    },


}
  </script>
  
  <style scoped>
  #barChartContainer {
    width: 800px;
    height: 400px;
  }

  </style>
  