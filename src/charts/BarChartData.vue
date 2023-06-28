<template>
    <h1>
        Bar chart with sample user data
    </h1>
    <div class="container" id="barChartContainer">
        <canvas id="barChart"></canvas>
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
    },


    methods: {

    readCSVData() {
      axios.get('/data/Hikaru_simple.csv')
        .then(response => {
          let csv = response.data;
          Papa.parse(csv, {
            header: true,
            complete: (results) => {
              this.csvData = results.data;
              graphBarChart(this.csvData);
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

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
  