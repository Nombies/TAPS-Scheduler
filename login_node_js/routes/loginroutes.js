const sqlite3 = require('sqlite3').verbose();
//this variable db connects to the database
let db = new sqlite3.Database('./../Databases/TAPS.db', (err)=> {
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

let sql = 'SELECT * FROM test WHERE email = ?';

exports.login = (req,res) =>{
  var email = req.body.email;
  var password = req.body.password;
  db.get(sql, [email], (err, row) =>{
    if(err){
      console.log(err);
      res.send({
        "code":400,
        "failed":"error occured"
      });
    }
    else{
        if(row.password === password){
          console.log('sent successfully ','name: ',row.first_name,' email: ', row.email, ' password: ', row.password );
          res.send({
            "code":200,
            "success":"login successfull"
          });
       }

      else{
        console.log('sent successfully but wrong password or email', row.password);
        res.send({
          "code":204,
          "success":"Email and password does not match"
        });
      }

    }
  });
}
