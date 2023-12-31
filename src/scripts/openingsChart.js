/* eslint-disable no-unused-vars */
import Chart from 'chart.js/auto';
import { LinearScale, PointElement, Tooltip, Legend, TimeScale } from 'chart.js';

Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale)

export function makeOpeningsChart(gameArchive) {

	let unsortedOpenings = getOpeningsData(gameArchive)
	let openingsData = processOpeningsData(unsortedOpenings, 10)

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
            data: draws,
            borderWidth: 0.5,
            backgroundColor: colors.GREY
          },
          {
            label: 'Loss',
            data: losses,
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

  
export function processOpeningsData(openingsData, n=100) {
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


// filters: 
// {
//   timeClass: "rapid",
//   color: "white",
// }

export function filterOpeningsData(gameArchive, filters) {
  // skip this part if filters is none
  const timeClass = filters.timeClass;
  const color = filters.color;

  let filteredGameArchive = [];
  for (let i = 0; i < gameArchive.length; i++) {

    if (gameArchive[i].timeClass === timeClass && gameArchive[i].color === color) {
      filteredGameArchive.push(gameArchive[i])
    }

  }
}

function getResult(result) {
  if (result === "win") {
    return "win";
  } 
  else if (result === "resigned" || result === "timeout" || result === "checkmated" || result === "abandoned") {
    return "loss";
  }
  else {
    return "draw";
  }
}
 

export function getOpeningsData(gameArchive, filters="none") {

  if (filters != "none") {
    let gameArchive = filterOpeningsData(gameArchive, filters) 
  }

  let mainLines = ["Kings Pawn Opening", "Queens Pawn Opening", "Caro Kann Defense", "Vienna Game", "French Defense", "Italian Game", "Scandinavian Defense", "Center Game", "Petrovs Defense", "Pirc Defense", "Four Knights Game", "Giuoco Piano Game", "Barnes Opening", "Philidor Defense", "Sicilian Defense", "Ruy Lopez Opening", "Three Knights Opening", "Nimzowitsch Defense", "Scotch Game", "Bishops Opening", "Alekhines Defense", "Slav Defense", "Ponziani Opening", "Vant Kruijs Opening", "Modern Defense", "Queens Gambit Declined", "Closed Sicilian Defense", "Reti Opening", "Kings Fianchetto", "Kings Gambit", "Van Geet Opening", "Englund Gambit", "English Opening", "Englund Gambit Declined", "Alapin Sicilian", "Birds Opening", "Mieses Opening", "Dutch Defense", "Grob Opening", "Indian Game", "Kings Indian", "Kadas Opening", "Queens Gambit Accepted", "Saragossa Opening", "Ware Opening", "Colle System", "Dresden Opening", "London System", "English Defense", "Benko Gambit", "Benoni", "Bogo-Indian", "Catalan", "Danish Gambit", "Grunfeld Defense", "Budapest Gambit", "Kings Indian Defense", "Kings Indian Attack", "Nimzo Indian Defense", "Nimzowitsch Larsen Attack", "Old Indian Defense", "Owens Defense", "Polish Opening", "Queens Indian Defense", "Semi Slav Defense", "Tarrasch Defense", "Trompowsky Attack"]

  let allOpenings = []

  for (let i = 0; i < gameArchive.length; i++) {
      let opening = gameArchive[i].opening;
      for (let j = 0; j < mainLines.length; j++) {
          if (opening.startsWith(mainLines[j])) {
              allOpenings.push({
                  timeClass: gameArchive[i].timeClass,
                  color: gameArchive[i].color,
                  result: getResult(gameArchive[i].result),
                  name: mainLines[j],
                  openingUrl: gameArchive[i].openingUrl
              });
          }
      }
  }

  let countedOpenings = getCounts(allOpenings);
  return countedOpenings;
}


// damn I need to learn typescript
export function getCounts(rawOpenings) {

	let nodeWithCounts = {};

	// Count occurrences of each opening name
	for (let i = 0; i < rawOpenings.length; i++) {
		let name = rawOpenings[i].name;
		if (nodeWithCounts[name]) {
		nodeWithCounts[name].count++;
		} else {
		nodeWithCounts[name] = {
			count: 1,
			win: 0,
			loss: 0,
			draw: 0
		};
		}
	}

	// get win, loss, and draw counts for each opening
	for (let i = 0; i < rawOpenings.length; i++) {
		let currentNode = rawOpenings[i];
		let name = currentNode.name;
		nodeWithCounts[name][currentNode.result]++;
	}


	// add counts to array 
	let countedOpenings = [];
	for (let name in nodeWithCounts) {
		let countedNode = nodeWithCounts[name];
		let processedNode = {
		name: name,
		count: countedNode.count,
		win: countedNode.win,
		loss: countedNode.loss,
		draw: countedNode.draw
		};

		countedOpenings.push(processedNode);
	}

	return countedOpenings;
}

