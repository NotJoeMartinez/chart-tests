/* eslint-disable */
import Chart from 'chart.js/auto'
import {LinearScale, PointElement, Tooltip, Legend, TimeScale} from "chart.js"; 

Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 

export function makeStackedBarChart() {


    const wins = [30, 40, 50, 60];
    const losses = [10, 20, 30, 40];
    const draws = [10, 20, 30, 40];

    const labels = ['200-299', '300-399', '400-499', '500-599'];
    const ctx = document.getElementById("barChart");
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
            label: 'Win',
            data: wins,
            borderWidth: 1
          },
          {
            label: 'Loss',
            data: losses,
            borderWidth: 1
          },
          {
            label: 'Draw',
            data: draws,
            borderWidth: 1
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
  

