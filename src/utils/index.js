export const combineData = (data) => {
   let objects =[]
   Object.keys(data).forEach(key => {
     const dataObj = data[key];
     Object.keys(dataObj).forEach(key => {
       objects.push(dataObj[key].name)
     })
   })
   return objects;
 }
