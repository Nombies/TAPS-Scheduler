const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./../Databases/TAPS.db', (err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

let deleteTask = 'DELETE FROM task WHERE taskID = ?;';
let deleteEmployee = 'DELETE FROM employee WHERE employeeID = ?';
let deleteCanDo = 'DELETE FROM can_do WHERE employeeID = ? AND taskID = ?';

function errorDeleteCheck(error,res, name){
  if(error) {
    console.error(error.message);
    res.send({
      "code":400,
      "failed":"bad request"
    });
  }
  //if query ran fine
  else{
    console.log('deleted successfully');
    res.send({
      "code":200,
      "success":name+" deleted successfully"
    });
  }
}

exports.deleteTask = (req, res) =>{
  var taskID = req.body.taskID;

  db.run(deleteTask, [taskID], (err) =>{
    errorDeleteCheck(err,res,"Task");
  });
}

exports.deleteEmployee = (req, res) =>{
  var employeeID = req.body.employeeID;

  db.run(deleteEmployee, [employeeID], (err) =>{
    errorDeleteCheck(err,res,"Employee");
  });
}

exports.deleteCanDo = (req, res) =>{
  var employeeID = req.body.employeeID;
  var taskID = req.body.taskID;

  db.run(deleteCanDo, [employeeID,taskID], (err) =>{
    errorDeleteCheck(err,res,"Can Do");
  });
}
