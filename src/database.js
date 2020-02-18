const mysql = require("mysql");

const mysqlConnection= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"world",
    multipleStatements:true
});
mysqlConnection.connect(function(err){
    if (err){
        console.log("error : ",err)
    }else{
        console.log("DB is conected");
    }
});
module.exports = mysqlConnection;