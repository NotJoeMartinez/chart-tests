
import Papa from 'papaparse';
import axios from 'axios';

export async function readCSVData() {
    axios.get('/data/rmasie599.csv')
      .then(response => {
        let csv = response.data;
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            let csvData = results.data;
            return csvData;
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
}