<template>
    <h1>
        Bar chart
    </h1>
    <div class="container" id="barChartContainer">
        <canvas id="barChart"></canvas>
    </div>


    <!-- <div class="container" id="barChartContainer">
      <div class="row">
        <div class="col-2">
          left
       </div>
      <div class="col-8">
        <canvas id="barChart"></canvas>
      </div>
      <div class="col-2">
        right
      </div>
    </div>
    </div> -->
</template>
  
<script>
import { graphBarChart } from '@/scripts/barChart.js' 

  export default {
    name: 'BarChart',
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
  