
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

                        let csvDataArr = []
                        for (let i = 0; i < this.csvData.length; i++) {
                            let csvDataObj = {
                                    "opening": this.csvData[i]["opening"],
                                }
                            csvDataArr.push(csvDataObj)
                        }
                        console.log("CSV Data: ", csvDataArr)

                        let openingsData = processOpeningsData(csvDataArr);
                        console.log("Sorted openings data: ", openingsData)
                        makeOpeningsChart(openingsData);
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
        },



    }
}

</script>

<style scoped>
  #barChartContainer {
    width: 800px;
    height: 400px;
  }
</style>