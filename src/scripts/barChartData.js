/* eslint-disable */
import Chart from 'chart.js/auto'
import {LinearScale, PointElement, Tooltip, Legend, TimeScale} from "chart.js"; 
import * as Utils from  "@/scripts/utils.js"

Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 

export function graphBarChart(chartData) {


    let ranges = getRanges(chartData);
    let rangeLabels = getRangeLabels(ranges);

    let data = makeDataSet(ranges, chartData);

    const wins = data["win"]; 
    const losses = data["loss"]; 
    const draws = data["draw"]; 


    console.log(rangeLabels)
    const ctx = document.getElementById("barChart");
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rangeLabels,
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
              stacked: true,
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
    let rating = Number(csvData[i]["opponentRating"]);

    if (rating > max) {
      max = rating;
    } 
    if (rating < min) {
      min = rating;
    }
  }
  
  let current = 0;
  while (current <= max) {
    ranges.push(current+99);
    current += 100;
  } 

  console.log("min: " + min);
  console.log("max: " + max);

  console.log(ranges)
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


function makeDataSet(ranges, chartData){

  let dataSets = {};

  for (let i = 0; i < ranges.length; i++) {
    dataSets[ranges[i]] = {
      "win": 0,
      "loss": 0,
      "draw": 0
    };
  }


  for (let i = 0; i < chartData.length; i++) {

    for (let j = 0; j < ranges.length; j++) {

      if (chartData[i]["opponentRating"] >= ranges[j] - 99 && chartData[i]["opponentRating"] <= ranges[j]) {
        let result = chartData[i]["result"];

        if (result == "win") {
          dataSets[ranges[j]]["win"] += 1;
        }
        if (result == "resigned" || result == "checkmated" || result == "timeout") {
          dataSets[ranges[j]]["loss"] += 1;
        }
        else {
          dataSets[ranges[j]]["draw"] += 1;
        }
      } 
    }

  }


  dataSets["win"] = [];
  dataSets["loss"] = [];
  dataSets["draw"] = [];

  for (let i = 0; i < ranges.length; i++) {
    dataSets["win"].push(dataSets[ranges[i]]["win"]);
    dataSets["loss"].push(dataSets[ranges[i]]["loss"]);
    dataSets["draw"].push(dataSets[ranges[i]]["draw"]);
  }

  console.log(dataSets);

  return dataSets;

}