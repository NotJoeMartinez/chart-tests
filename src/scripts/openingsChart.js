/* eslint-disable no-unused-vars */
import Chart from 'chart.js/auto';
import { LinearScale, PointElement, Tooltip, Legend, TimeScale } from 'chart.js';

Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale)

export function makeOpeningsChart(openingsData) {

    // const labels = ["Kings Pawn Opening", "Queens Pawn Opening", "Caro Kann Defense", "Vienna Game"];
    // const counts =  [153, 120, 106, 65];
    // const wins = [30, 40, 50, 60];
    // const losses = [10, 20, 30, 40];
    // const draws = [10, 20, 30, 40];

    const labels = openingsData.labels 
    const counts = openingsData.counts
    const wins = openingsData.wins
    const losses = openingsData.losses
    const draws = openingsData.draws

    let colors = {
        RED: "#8f3431",
        GREEN: "#708641",
        GREY: "#888683"
    }
    const ctx = document.getElementById("barChart");

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
            label: 'Win',
            data: wins,
            borderWidth: 0.5,
            backgroundColor: colors.GREEN
          },
          {
            label: 'Draw',
            data: losses,
            borderWidth: 0.5,
            backgroundColor: colors.GREY
          },
          {
            label: 'Loss',
            data: draws,
            borderWidth: 0.5,
            backgroundColor: colors.RED
          }
        ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stacked: true
            },
            x: {
                beginAtZero: true,
                stacked: true
            }
          }
        }
      });

}
  


function processOpeningsData(openingsData, n) {
    // Sort the data by count in descending order
    openingsData.sort((a, b) => b.count - a.count);

    // Determine the cutoff index based on the percentile
    const cutoffIndex = Math.ceil((n / 100) * openingsData.length);

    // Slice the array to get the top n%
    const topOpeningsData = openingsData.slice(0, cutoffIndex);

    // Create separate arrays for each property
    const labels = topOpeningsData.map(data => data.name);
    const counts = topOpeningsData.map(data => data.count);
    const wins = topOpeningsData.map(data => data.win);
    const losses = topOpeningsData.map(data => data.loss);
    const draws = topOpeningsData.map(data => data.draw);

    return {
        labels,
        counts,
        wins,
        losses,
        draws
    };
}