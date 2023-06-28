/* eslint-disable */
import Chart from 'chart.js/auto'
import {LinearScale, PointElement, Tooltip, Legend, TimeScale} from "chart.js"; 
import * as Utils from  "@/scripts/utils.js"

Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 

export function graphBarChart(chartData) {

    let ranges = getRanges(chartData);
    let rangeLabels = getRangeLabels(ranges);

    let data = makeDataSet(ranges, chartData);

    console.log(data)

    const wins = data["winPercent"]; 
    const losses = data["lossPercent"]; 
    const draws = data["drawPercent"]; 

    // const wins = data["win"]; 
    // const losses = data["loss"]; 
    // const draws = data["draw"]; 



    let green = "#708641"
    let grey = "#888683"
    let red = "#8f3431"

    const footer = (tooltipItems) => {
      let sum = 0;
    
      tooltipItems.forEach(function(tooltipItem) {
        sum += tooltipItem.parsed.y;
      });
      return 'Sum: ' + sum;
    };

    const ctx = document.getElementById("barChart");
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rangeLabels,
          datasets: [
            {
              label: 'Win',
              data: wins,
              borderWidth: 1,
              backgroundColor: green, 
            },
            {
              label: 'Loss',
              data: losses,
              borderWidth: 1,
              backgroundColor: red, 
            },
            {
              label: 'Draw',
              data: draws,
              borderWidth: 1,
              backgroundColor: grey, 
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
          },
          plugins: {
            tooltip: {
              callbacks: {
                label:  function(context) {
                  let label = context.dataset.label || '';

                 
                  if (context.parsed.y !== null) {

                      let rangeIndex = context.parsed.x;
                      let rangeKey = ranges[rangeIndex];
                      let rangeLabelY = context.parsed.y;

                      let labelOnHover = data[rangeKey][label.toLowerCase()];


                      if (label) {
                        label += ': ';
                      }

                      label += `${labelOnHover} (${rangeLabelY}%)`
                  }
                  return label; 
                }
              }
            }
          }
        }
      });

}
  


function getRanges(csvData) {
  let oppRatingList = []; 
  for (let i = 0; i < csvData.length; i++) {
    let rating = Number(csvData[i]["opponentRating"]);
    if (isNaN(rating)) {
      continue;
    }
    oppRatingList.push(rating);
  }

  let min = Math.min(...oppRatingList);
  let max = Math.max(...oppRatingList);

  
  let ranges = [];
  let current = Math.floor(min/100) * 100;

  console.debug("min with round: " + min);

  while (current <= max) {
    ranges.push(current+99);
    current += 100;
  } 

  console.log("min: " + min);
  console.log("max: " + max);

  return ranges;
}


function getRangeLabels(ranges) {
  console.log("ranges: " + ranges)
  let rangeLabels = [];
  for (let i = 0; i < ranges.length; i++) {
    let start = ranges[i] - 99;
    rangeLabels.push(start + "-" + ranges[i]);
  }
  return rangeLabels;
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

  dataSets["winPercent"] = [];
  dataSets["lossPercent"] = [];
  dataSets["drawPercent"] = [];

  for (let i=0; i <ranges.length; i++) {
    let total = Number(dataSets["win"][i] + dataSets["loss"][i] + dataSets["draw"][i]);

    let w = Math.round(dataSets["win"][i] / total * 100)
    let l =  Math.round(dataSets["loss"][i] / total * 100)
    let d =  Math.round(dataSets["draw"][i] / total * 100)

    if (isNaN(w)) {
      w = 0;
    }
    if (isNaN(l)) {
      l = 0;
    }

    if (isNaN(d)) {
      d = 0;
    }

    dataSets["winPercent"].push(w);
    dataSets["lossPercent"].push(l);
    dataSets["drawPercent"].push(d);
  }

  return dataSets;

}