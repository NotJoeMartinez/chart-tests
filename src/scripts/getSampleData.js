
import Papa from 'papaparse';
import axios from 'axios';

export function readCSVData() {
    axios.get('/data/rmasie599.csv')
      .then(response => {
        let csv = response.data;
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            let csvData = results.data;
            console.log("here: CSV Data: ", csvData)
            return csvData;
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
}