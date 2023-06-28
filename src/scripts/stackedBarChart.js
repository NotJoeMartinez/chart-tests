/* eslint-disable */
import Chart from 'chart.js/auto'
import {LinearScale, PointElement, Tooltip, Legend, TimeScale} from "chart.js"; 
import * as Utils from  "@/scripts/utils.js"

Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 

export function graphBarChart(chartData) {

    // let ranges = getRanges(chartData);
    // let rangeLabels = getRangeLabels(ranges);
    // let rangeCounts = getRangeCounts(ranges, chartData);
    // console.log(rangeCounts)

    const NUMBER_CFG = {count: 3, min: 0, max: 600};
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
  


function getRanges(csvData) {
  let max = 0;
  let min = 0;

  let ranges = [];

  for (let i = 0; i < csvData.length; i++) {
    if (csvData[i]["opponentRating"] > max) {
      max = csvData[i]["opponentRating"];
    } 
    if (csvData[i]["opponentRating"] < min) {
      min = csvData[i]["opponentRating"];
    }
  }
  let current = 0;
  while (current <= max) {
    ranges.push(current+99);
    current += 100;
  }
  return ranges;
}


function getRangeLabels(ranges) {
  let rangeLabels = [];
  for (let i = 0; i < ranges.length; i++) {
    let start = ranges[i] - 99;
    rangeLabels.push(start + "-" + ranges[i]);
  }
  return rangeLabels;
}


function getRangeCounts(ranges, chartData) {
  let rangeCounts = [];

  for (let i = 0; i < ranges.length; i++) {
    let count = 0;
    for (let j = 0; j < chartData.length; j++) {
      if (chartData[j]["opponentRating"] >= ranges[i] - 99 && chartData[j]["opponentRating"] <= ranges[i]) {
        count++;
      }
    }
    rangeCounts.push(count);
  
  }
  return rangeCounts;

}


function makeDataSets(ranges, chartData){

  let dataSets = [];

  for (let i = 0; i < ranges.length; i++) {
    dataSets.push({
      label: ranges[i],
      data: [],
      borderWidth: 1
    })
  }
  return dataSets;

}