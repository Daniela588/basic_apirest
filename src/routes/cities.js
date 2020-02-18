const{Router}= require ('express');
const router = new Router();
const _ = require('underscore');
const  mysqlConnection = require("../database");

router.get('/',(req,res)=>{
mysqlConnection.query("SELECT * FROM city",(err,rows,fileds)=>{
    if(err){
        console.log("error: ",err);
    }else{
        res.json(rows);

    }
});
});

router.post('/',(req,res)=>{
    const{Name,CountryCode,District,Population}=req.body;
   mysqlConnection.query("INSERT INTO city VALUES(NULL,?,?,?,?)",[Name,CountryCode,District,Population],(err,row,field)=>{
       if(err){
           console.log(err);
       }else{
           res.json({"status":"city inserted"});
       }
   })
    
});
router.delete('/:id',function(req,res){
  const{id}=req.params;
  mysqlConnection.query("DELETE FROM city WHERE id = ?",[id],(err,row,field)=>{
    if(err){
        console.log(err);
    }else{
        res.json({"status":"city deleted"});
    }
})
});
router.put('/:id',function(req,res){
    const{id}=req.params;
    const{Name,CountryCode,District,Population}=req.body;
    mysqlConnection.query("UPDATE city SET Name=?, CountryCode = ?, District=?,Population=? WHERE id = ?",[Name,CountryCode,District,Population,id],(err,row,field)=>{
        if(err){
            console.log(err);
        }else{
            res.json({"status":"city update"});
        }
    })
     
 

});
module.exports = router;