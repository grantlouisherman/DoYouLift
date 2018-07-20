const axios = require('axios');
const fs = require('fs');
const API_CALLS = [];
//Legs Arms Abs Back Chest Shoulders Calves
let Legs = [];
let Arms = [];
let Abs = [];
let Back = [];
let Chest = [];
let Shoulders = [];
let Calves = [];
for(let i=2;i<=20;i++){
  API_CALLS.push(axios.get(`https://wger.de/api/v2/exerciseinfo/?page=${i}`))
}
const buildDataObjects = (category, object) => {
  switch(category){
    case 'Legs':
      Legs.push(object);
      break;
    case 'Arms':
      Arms.push(object);
      break;
    case 'Back':
      Back.push(object);
      break;
    case 'Chest':
      Chest.push(object);
      break;
    case 'Shoulders':
      Shoulders.push(object);
      break;
    case 'Calves':
      Calves.push(object);
      break;
    return null;
  }
}
const buildDataFiles = (workout, jsonContent) => {
  fs.writeFile(`${workout}.json`, jsonContent, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }

      console.log("JSON file has been saved.");
  });
}
const resolved_Calls =[]
Promise.all(API_CALLS).then(calls => {
  // console.log(calls[0].data)
  calls.forEach(call => {
    let obj = {}
    const results = call.data.results;
    results.forEach( result => {
      const { id, name } = result.category
      const { description, muscles, muscles_secondary, equipment } = result;
      obj[result.name] = {
        name,
        description,
        muscles,
        muscles_secondary,
        equipment
      }
      buildDataObjects(name, obj);
    })
  })
})
.then(() => {
    const LEGS = JSON.stringify(Legs, null, 4);
    const ARMS = JSON.stringify(Arms, null, 4);
    const ABS = JSON.stringify(Abs, null, 4);
    const BACK = JSON.stringify(Back, null, 4);
    const CHEST = JSON.stringify(Chest, null, 4);
    const SHOULDERS = JSON.stringify(Shoulders, null, 4);
    const CALVES = JSON.stringify(Calves, null, 4);
    buildDataFiles('Legs', LEGS);
    buildDataFiles('ARMS', ARMS);
    buildDataFiles('BACK', BACK);
    buildDataFiles('CHEST', CHEST);
    buildDataFiles('SHOULDERS', SHOULDERS);
    buildDataFiles('CALVES', CALVES);
})


/*

Preprocess data so you create graphql queries

*/
