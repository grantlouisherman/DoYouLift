export const combineData = (data) => {
   let objects =[];
   Object.keys(data).forEach(typeKey => {
     const dataObj = data[typeKey];
     Object.keys(dataObj).forEach(workoutKey => {
       objects.push({ type: typeKey, name: dataObj[workoutKey].name } )
     })
   })
   return objects;
 }
