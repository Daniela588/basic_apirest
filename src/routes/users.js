const {Router} =require('express');
const router = new Router();
const _ = require('underscore');

const mysqlConnection = require("../database");

  router.post('/' ,(req,res) => {
      const {username,email,password,names,lastnames,phone,photo,role} = req.body;
      mysqlConnection.query("INSERT INTO users VALUES (NULL,?,?,?,?,?,NULL,?,?,?,NULL,NULL)", [username,email,password,names,lastnames,phone,photo,role] ,(err,row,field)=>{
if(err){
    console.log(err);
}else{
    res.json({"status":"locals inserted"});
}
      })
  });
  router.post('/client' ,(req,res) => {
    const {username,email,password,names,lastnames,phone,photo,url_identification,region,birthday} = req.body;
    mysqlConnection.query("INSERT INTO clients VALUES (NULL,?,?,?)", [url_identification,region,birthday] ,(err,row,field)=>{
if(err){
  console.log(err);
}else{
    mysqlConnection.query("INSERT INTO users VALUES (NULL,?,?,?,?,?,NOW(),?,?,'CLIENT',?,NULL)", [username,email,password,names,lastnames,phone,photo,row.insertId] ,(err,row,field)=>{
        if(err){
            console.log(err);  
        }else{
  res.json({"status":"locals inserted"});
}
    });
     }
})
 });
 router.post('/delivery' ,(req,res) => {
    const {username,email,password,names,lastnames,phone,photo,url_identification,url_licence,balance,total_orders} = req.body;
    mysqlConnection.query("INSERT INTO deliveries VALUES (NULL,?,?,?,?)", [url_identification,url_licence,balance,total_orders] ,(err,row,field)=>{
if(err){
  console.log(err);
}else{
    mysqlConnection.query("INSERT INTO users VALUES (NULL,?,?,?,?,?,NOW(),?,?,'deliveryt',NULL,?)", [username,email,password,names,lastnames,phone,photo,row.insertId] ,(err,row,field)=>{
        if(err){
            console.log(err);  
        }else{
  res.json({"status":"locals inserted"});
}
    });
     }
})
 });
 router.get('/',(req,res)=>{
    mysqlConnection.query("SELECT * FROM users", (err,rows,fields)=>{
        if(err){
            console.log("error: ",err);
        }else{
            res.json(rows);
        }
    })
     });
     router.get('/client', (req,res)=>{ 
        mysqlConnection.query("SELECT * FROM users JOIN clients ON users.client = clients.idclient",(err,rows,fields)=>{
            if(err){
                console.log("Error : ", err);
            }else{
                res.json(rows);
            }
        })
    });
    
    router.get('/delivery', (req,res)=>{ 
        mysqlConnection.query("SELECT *  FROM users JOIN deliveries ON users.delivery = deliveries.idsellers",(err,rows,fields)=>{
            if(err){
                console.log("Error : ", err);
            }else{
                res.json(rows);
            }
        })
    });
             router.delete('/:iduser',function(req,res){
                const {iduser} = req.params;
                mysqlConnection.query("DELETE FROM users WHERE iduser= ?", [iduser] ,(err,row,field)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.json({"status":"locals deleted"});
                    }
                })
                });
                router.delete('/client/:idclient',function(req,res){
                    const {idclient} = req.params;
                    mysqlConnection.query("DELETE clients.* , users.* FROM clients JOIN users ON users.client = clients.idclient WHERE clients.idclient= ?", [idclient] ,(err,row,field)=>{
                        if(err){
                            console.log(err);
                        }else{
                           
                            res.json({"status":"locals deleted"});
                        }
                    })
                    });
                    router.delete('/delivery/:idsellers',function(req,res){
                        const {idsellers} = req.params;
                        mysqlConnection.query("DELETE deliveries.* , users.* FROM deliveries JOIN users ON users.delivery = deliveries.idsellers WHERE deliveries.idsellers= ?", [idsellers] ,(err,row,field)=>{
                            if(err){
                                console.log(err);
                            }else{
                               
                                res.json({"status":"locals deleted"});
                            }
                        })
                        });
                        router.put('/users/:iduser',function(req,res){
                            const{iduser} = req.params; 
                            const {username,email,password,names,lastnames,phone,photo,role} = req.body;
                            mysqlConnection.query("UPDATE users SET username= ?,email= ?,password= ?,names= ?,lastnames= ?,phone= ?,photo= ?,role= ? WHERE iduser=?",[username,email,password,names,lastnames,phone,photo,role,iduser],(err,row,field)=>{
                             if(err){
                                 console.log(err);
                          
                             }else{
                                 res.json({"status":"local update"});
                             }
                             })
                        });
                        
                        router.put('/clients/:idclient',function(req,res){
                            const{idclient} = req.params; 
                            const {username,email,password,names,lastnames,phone,photo,url_identification,birthday} = req.body;
                            mysqlConnection.query("UPDATE users SET username= ?,email= ?,password= ?,names= ?,lastnames= ?,phone= ?,photo= ? WHERE client=?",[username,email,password,names,lastnames,phone,photo,idclient],(err,row,field)=>{
                                if (err) {
                                    console.log(err);
                                } else {
                          mysqlConnection.query("UPDATE clients SET url_identification= ?,birthday=? WHERE idclient= ?", [url_identification,birthday,row.insertId], (err, row, fields) => {
                                      if (err) {
                                          console.log(err);
                                      }else{
                                          res.json({"status": "client Update"});
                        
                                        }
                                    });
                                  }
                              })
                          
                          });
                        
                          router.put('/deliveries/:idsellers',function(req,res){
                            const{idsellers} = req.params;
                            const {username,email,password,names,lastnames,phone,photo,url_identification,url_licence,balance,total_orders} = req.body;
                            mysqlConnection.query("UPDATE users SET username= ?,email= ?,password= ?,names= ?,lastnames= ?,phone= ?,photo= ? WHERE delivery=?",[username,email,password,names,lastnames,phone,photo,idsellers],(err,row,field)=>{
                                if (err) {
                                    console.log(err);
                                } else {
                          mysqlConnection.query("UPDATE deliveries SET url_identification= ?,url_licence= ?,balance= ?,total_orders= ? WHERE idsellers= ?", [url_identification,url_licence,balance,total_orders,row.insertId], (err, row, fields) => {
                                      if (err) {
                                          console.log(err);
                                      }else{
                                          res.json({"status": "delivery Update"});
                        
                                        }
                                    });
                                  }
                              })
                          
                          });
                        
                        
                        
 module.exports = router;