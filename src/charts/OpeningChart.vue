
<template>
    <h1>
        Openings Chart
    </h1>
    <div class="container" id="barChartContainer">
        <canvas id="barChart"></canvas>
    </div>
</template>

<script>
import { processOpeningsData, makeOpeningsChart } from '@/scripts/openingsChart.js'; 
import Papa from 'papaparse';
import axios from 'axios';

export default {
    name: 'OpeningChart',
    data() {
        return {
            csvData: []
        }
    },
    mounted() {
        this.readCSVData();
    },
    methods: {
        readCSVData() {
            axios.get('/data/testData.csv')
        .then(response => {
          let csv = response.data;
          Papa.parse(csv, {
            header: true,
            complete: (results) => {
              this.csvData = results.data;
              let csvObj = JSON.parse(JSON.stringify(this.csvData));
              let openingsData = processOpeningsData(csvObj, 10) 
              makeOpeningsChart(openingsData);
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

<style scoped>
  #barChartContainer {
    width: 800px;
    height: 400px;
  }
</style>