const mongoose = require('mongoose');
const db = process.env.DB;
mongoose.set('strictQuery', true);
mongoose.connect(db).then(function(){
    console.log("Connected safely to the database!");
}).catch(function(getError){
    console.log(`Caught error while connecting to the database: ${getError}`);
});