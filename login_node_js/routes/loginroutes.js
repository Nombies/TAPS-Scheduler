const sqlite3 = require('sqlite3').verbose();
var bcrypt = require('bcrypt');
//this variable db connects to the database
let db = new sqlite3.Database('../../currTAPS.db', (err)=> {
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

let sql = 'SELECT * FROM employee WHERE email = ?';
let insertEmployee = 'INSERT INTO employee VALUES ((SELECT MAX(employeeID)+1 FROM employee),?,?,?,?,?,?,?,?,?,?,?,?)';
//TODO::SEND Valid information later
exports.login = (req,res) =>{
  var email = req.body.email;
  var password = req.body.password;
  console.log('email ' + email + ' password ' + password);
  db.get(sql, [email], (err, row) =>{
    if(err){
      console.log(err);
      res.send({
        "code":400,
        "failed":"error occured"
      });
    }
    else{
      //compare password
      console.log(row);
      if(row === undefined){
        res.send({
          "code":400,
          "failed":"user does not exist"
        });
        return;
      }
      bcrypt.compare(password,row.password_hash, (errPassword, resPassword) =>{
        console.log('res password ' + resPassword);
        if(resPassword === true){
          //What you send the user
	  var token = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	  db.run('UPDATE employee SET token = ? WHERE email = ?',[token,email], (err) =>{
           if(err){
             res.send({
               "code":400,
               "failed":"error making a token"
             });
           return;
           }
          });
          res.send({
            "code":200,
            "success":"login successfull",
            "employeeID":row.employeeID,
            "token":token
          });
        }
        else{
          res.send({
            "code":400,
            "success":"Email and password does not match"
          });
        }
      });
    }
  });
}
exports.signup = (req,res) =>{
  var first_name = req.body.first_name;
  var middle_name = req.body.middle_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  var modify_task = req.body.modify_task;
  var modify_emp_attr = req.body.modify_emp_attr;
  var username = req.body.username;
  var password = req.body.password;

  var salt = bcrypt.genSaltSync(10);
  var passHash = bcrypt.hashSync(password,salt);
  var preffered_hours = req.body.preffered_hours;
  var nextID = -1;
  var token = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  console.log(req.body);

    db.run(insertEmployee,[first_name,middle_name,last_name,email,
    phone_number,modify_task,modify_emp_attr,username,salt,passHash,preffered_hours,token], (err)=>{
      if(err){
        res.send({
          "code":400,
          "failed":"Error with given information"
        });
      }
      else{
        res.send({
          "code":200,
          "success":"employee added to database"
        });
      }
    });
}
