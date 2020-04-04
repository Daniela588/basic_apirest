const {Router} =require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConnection = require("../database");

 router.get('/',(req,res)=>{
mysqlConnection.query("SELECT * FROM locals", (err,rows,fields)=>{
    if(err){
        console.log("error: ",err);
    }else{
        res.json(rows);
    }
})
 });

  router.post('/' ,(req,res) => {
      const {Name,description,url_image,categoria} = req.body;
      mysqlConnection.query("INSERT INTO locals VALUES (NULL,?,?,?,?)", [Name,description,url_image,categoria] ,(err,row,field)=>{
if(err){
    console.log(err);
}else{
    res.json({"status":"locals inserted"});
}
      })
  });
    
  router.delete('/:idlocal',function(req,res){
    const {idlocal} = req.params;
    mysqlConnection.query("DELETE FROM locals WHERE idlocal= ?", [idlocal] ,(err,row,field)=>{
        if(err){
            console.log(err);
        }else{
            res.json({"status":"locals deleted"});
        }
    })
    });
    
  router.put('/:idlocal',function(req,res){
  const {idlocal} = req.params;
  const {Name,description,url_image,categoria} = req.body;
  mysqlConnection.query("UPDATE locals SET Name = ?, description =?, url_image= ?, categoria= ?", [Name,description,url_image,categoria,idlocal] ,(err,row,field)=>{
    if(err){
        console.log(err);
    }else{
        res.json({"status":"locals update"});
    }
})
  });
  
    
    
  module.exports = router;