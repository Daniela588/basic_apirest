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
})
});
router.get('/languageByCountry/:continent',(req,res)=>{
    const{continent}=req.params;
    mysqlConnection.query("SELECT countrylanguage.*, country.Continent FROM countrylanguage JOIN country ON countrylanguage.CountryCode =country.Code WHERE country.Continent = ?",[continent],(err,rows,fileds)=>{
        if(err){
            console.log("error: ",err);
        }else{
            res.json(rows);
    
        }
    })
    });
    router.get('/nameByCountry/:continent',(req,res)=>{
        const{continent}=req.params;
    mysqlConnection.query("SELECT country.Name, country.Continent, country.Region, country.IndepYear FROM country WHERE country.Continent = ? ORDER BY country.IndepYear DESC",[continent],(err,rows,fileds)=>{
        if(err){
            console.log("error: ",err);
        }else{
            res.json(rows);
    
        }
    })
    });
    router.get('/promedioByCountry/:continent',(req,res)=>{
        const{continent}=req.params;
    mysqlConnection.query("SELECT country.Continent , AVG (country.Population) AS promedio FROM country WHERE country.Continent = ?",[continent],(err,rows,fileds)=>{
        if(err){
            console.log("error: ",err);
        }else{
            res.json(rows);
    
        }
    })
    });
    router.get('/cityByCountry/:continent',(req,res)=>{
        const{continent}=req.params;
    mysqlConnection.query("SELECT city.* FROM city WHERE city.population=(SELECT MAX(population) FROM city)",[continent],(err,rows,fileds)=>{
        if(err){
            console.log("error: ",err);
        }else{
            res.json(rows);
    
        }
    })
    });
    router.get('/zaByCountry/:continent',(req,res)=>{
       const{continent}=req.params;
    mysqlConnection.query("SELECT country.Name, city.Name FROM country JOIN city ON country.Code = city.CountryCode WHERE city.Name LIKE '%"+continent+"%'",(err,rows,fileds)=>{
        if(err){
            console.log("error: ",err);
        }else{
            res.json(rows);
    
        }
    })
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