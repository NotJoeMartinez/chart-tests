
import Chart from 'chart.js/auto'
import {LinearScale, PointElement, Tooltip, Legend, TimeScale} from "chart.js"; 


Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 

export function graphBarChart() {
    const ctx = document.getElementById("barChart");

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    // const barChart = new Chart(ctx, {
    //   type: "bar",
    //   label: "Results",
    //   data: {
    //   labels: labels,
    //   datasets: [
    //     {
    //     label: "times used",
    //     data: values,
    //     borderWidth: 1
    //   }
    //   ]
    // },
    // options: {
    //   responsive: true,
    //   plugins: {
    //     tooltip: {
    //       callbacks: {
    //         title: function (context) {
    //           return context[0].label;
    //         },
    //         label: function (context) {
    //           const winCount = allData[context.dataIndex].winCount;
    //           const lossCount = allData[context.dataIndex].lossCount;
    //           const drawCount = allData[context.dataIndex].drawCount;
    //           return [
    //             `Wins: ${winCount}`,
    //             `Losses: ${lossCount}`,
    //             `Draws: ${drawCount}`
    //           ];
    //         },
    //       },
    //     },
    //   },
    //   onClick: function (event, elements) {
    //     if (elements.length) {
    //       const dataIndex = elements[0].index;
    //       const url = allData[dataIndex].url;
    //       window.open(url, "_blank");
    //     }
    //   },
    //   scales: {
    //     y: {
    //       beginAtZero: true
    //     },
    //     x: {
    //       ticks: {
    //           display: false
    //      }
    //   }
    //   }
    // }
    // });
    // console.debug("resByOp", resByOp)
    // return resByOp;
}
  