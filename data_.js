const axios = require('axios');
const fs = require('fs');
const API_CALLS = [];
const exlcudeTheseWorkouts = ["Ausfallschritt Trizepsdrücken ü. Kopf, ß-Stange",
"Bankdrücken Eng", "Bigmarms", "Bizeps am Kabel","Bizeps am Kabel, ß-Stange", "Bizeps Curls Mit ß-Stange",
"Bizeps KH-Curls", "Bizeps KH-Curls Schrägbank", "Bizeps LH-Curls",
"Dips Zwischen 2 Bänke", "Handgelenk-Beugen", "Handgelenkstreckung", "Jazz Cersixe", "KH an Scottmaschine",
"Liegestütz", "Scott Curl KH","Costas Com Barra de Puxar", "Einarmiges Rudern KH", "Frontziehen Breit",
"Frontziehen Eng", "Klimmzüge", "Klimmzüge an Maschine", "Kreuzheben",
"Lat Übung in Seitlage", "Lat-Ziehen Mit Gesteckten Armen am Seilzug", "Latzug Breit Zur Brust",
 "Latzug Eng im Untergriff Zur Brust", "Nackenziehen",
"Přítahy v Kleče Jednoručkou", "Přítahy v Sedě s Oporou", "Rückenmaschine",
"Rückenstrecken im Liegen (Superman) / Lying Back Extension", "Rückenübung",
"Rudern am Tiefen Block (Seilzug)", "Rudern Eng Zum Bauch", "Rudern Vorgebeugt LH",
"Rudern Vorgebeugt LH Reverse", "Rumunský Mrtvý Tah", "Schwimmer",
"Bankdrücken KH", "Bankdrücken LH", "Bendž", "Brustpresse", "Kabelcross", "Kabelziehen Von Unten",
"Liegestüzten Diamond", "Negativ Bankdrücken", "Oberer Kabelzug", "Planke zu Liegestütz", "Propadanje", "Razboj",
"Schrägbankdrücken KH", "Schrägbankdrücken LH", "Schrägbankdrücken MP",
"Ausfallschritte im Gehen", "Ausfallschritte Stehend", "Beinbeuger Liegend",
"Beinbeuger Sitzend", "Beinbeuger Stehend", "Beinbeuger Stehend", "Beinpresse Eng", "Beinstrecker",
"Beinstrecker Einbeinig", "Bicicleta Cardio", "Dřep do Sedu na Box", "Eselstritt", "Fentes Avant",
"Feuerhydrant", "Front Kniebeuge", "Gefangenen Geht up", "Kniebeuge", "Kniebeuge an Hackenschmidtmaschine", "Kniebeuge an Multipresse - Eng",
"Marschieren Auf Der Stelle", "Rev. Ausfallschritt", "Seitliche Ausfallschritt-Sprünge", "Bergliegestütz", "Bogenschütze", "Frontdrücken KH",
"Frontdrücken LH", "Frontdrücken MP", "Frontheben am Kabel", "Frontheben Mit Scheibe", "Kabelzug", "Karen Meets Grace", "Nuevo",
"Rudern Aufgelegt","Rudern Aufrecht MP","Rudern Aufrecht ß-Stange","Schulterdrücken KH","Schulterdrücken LH","Schulterdrücken LH Hinter Dem Kopf",
"Schultermaschine","Seitheben am Kabel, Einarmig","Seitheben KH", "Seitheben Mit Theraband"];
const isNotExcluded = name => (exlcudeTheseWorkouts.indexOf(name) == -1)
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
    default:
      break;
  }
}
const buildDataFiles = (workout, jsonContent) => {
  fs.writeFile(`./data/${workout}.json`, jsonContent, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }

      console.log("JSON file has been saved.");
  });
}
const resolved_Calls =[]
Promise.all(API_CALLS).then(calls => {
  calls.forEach(call => {
    let obj = {}
    const results = call.data.results;
    results.forEach( result => {
      const { name } = result.category;

      if(isNotExcluded(result.name)){
        buildDataObjects(name , result);
      }
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
    buildDataFiles('legs', LEGS);
    buildDataFiles('arms', ARMS);
    buildDataFiles('back', BACK);
    buildDataFiles('chest', CHEST);
    buildDataFiles('shoulders', SHOULDERS);
    buildDataFiles('calves', CALVES);
})
.catch(err => (console.error))


/*

Preprocess data so you create graphql queries

*/
