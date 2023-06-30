
<template>
    <h1>
        Openings Chart
    </h1>
    <div class="container" id="barChartContainer">
        <canvas id="barChart"></canvas>
    </div>
</template>

<script>
/* eslint-disable */
import { fetchUserData } from '@/scripts/myUtils.js'; 
import { processOpeningsData, getOpeningsData, makeOpeningsChart } from '@/scripts/openingsChart.js';

export default {
    name: 'OpeningChart',
    data() {
        return {
            csvData: []
        }
    },
    mounted() {
        this.buildChart();
    },
    methods: {
        async buildChart(){
            let archiveData = await fetchUserData("/data/testUser3.json")
            makeOpeningsChart(archiveData.parsedGames)
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