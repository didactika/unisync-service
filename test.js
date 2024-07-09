const axios = require('axios');
const fs = require('fs');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://teaching-action.fbr.group/ekko-service-api/source/6413443b6688702510e7d254/OLDKOHA/items?chunk=20000&lang=es',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF90ZWFjaGVyIjoiMjEiLCJjb3Vyc2VfaWQiOiI4MDciLCJjb3Vyc2Vfc2hvcnRuYW1lIjoiU04xMDMtdkVBIiwiY291cnNlX2lkbnVtYmVyIjoiNWEwMTIzZTUtMjU0Mi01M2Q1LTgzYTQtYWJmYmQyMTc4ZGM3fHxTTjEwMy12RUEiLCJtb29kbGVfdXJsIjoiaHR0cHM6XC9cL2NhbXB1cy5mdW5pYmVyLm9yZyIsImlzX21hbmFnZXIiOnRydWV9.quEN-n0tqfH_MOLVA9pMIq25LPkHrvbJnln0FeS2ALY', 
    'X-User': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2FtcHVzIEZVTklCRVIiLCJ1cmwiOiJodHRwczovL2NhbXB1cy5mdW5pYmVyLm9yZyIsImRvbWFpbiI6ImZ1bmliZXIub3JnIiwic2VydmljZVVybCI6Imh0dHBzOi8vdGVhY2hpbmctYWN0aW9uLmZici5ncm91cC9la2tvLXNlcnZpY2UtYXBpLyIsImlhdCI6MTY4OTU4MzcyM30.yDrhio1tsh8U8v_zjA6b7usqkVH0vy0YpjtjofqWu0E'
  }
};
console.log('Requesting data...');
axios.request(config)
.then((response) => {
  const data = JSON.stringify(response.data, null, 2); // Formatear JSON con indentación de 2 espacios
  fs.writeFile('response.json', data, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('Response saved to response.json');
    }
  });
})
.catch((error) => {
  console.log(error);
});
