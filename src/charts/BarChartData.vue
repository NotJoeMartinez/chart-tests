<template>
    <h1>
        Bar chart with sample user data
    </h1>
    <div class="container" id="barChartContainer">
        <canvas id="barChart"></canvas>
    </div>

    <h1>CSV Data:</h1>
    <div v-for="(row, index) in csvData" :key="index">
      {{ row }}
    </div>

</template>
  
<script>
import { graphBarChart } from '@/scripts/barChartData.js' 

import Papa from 'papaparse';
import axios from 'axios';

  export default {
    name: 'BarChart',
    data() {
      return {
        csvData: []
      }
    },
    props: {
      msg: String
    },

    mounted() {
      this.readCSVData();
      graphBarChart();
    },

    methods: {
    readCSVData() {
      axios.get('/data/rmasie599.csv')
        .then(response => {
          let csv = response.data;
          Papa.parse(csv, {
            header: true,
            complete: (results) => {
              this.csvData = results.data;
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
      console.log(this.csvData);
    },
  },

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #barChartContainer {
    width: 800px;
    height: 400px;
  }

  </style>
  