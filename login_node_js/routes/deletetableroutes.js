const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./../Databases/TAPS.db', (err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

let qDeleteTask = 'DELETE FROM task WHERE taskID = ?;';
let qDeleteEmployee = 'DELETE FROM employee WHERE employeeID = ?';
let qDeleteCanDo = 'DELETE FROM can_do WHERE employeeID = ? AND taskID = ?';
let qDeleteNotAvailable = 'DELETE FROM not_available WHERE employeeID = ? AND'+
                          'start_time = ? AND end_time = ? AND day = ? AND' +
                          'start_date = ? AND end_date = ?;';
let qDeleteScheudle = 'DELETE FROM schedule WHERE scheduleID = ?';
let qDeleteTOR = 'DELETE FROM TOR WHERE torID = ?';
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

  db.run(qDeleteTask, [taskID], (err) =>{
    errorDeleteCheck(err,res,"Task");
  });
}

exports.qDeleteEmployee = (req, res) =>{
  var employeeID = req.body.employeeID;

  db.run(qDeleteEmployee, [employeeID], (err) =>{
    errorDeleteCheck(err,res,"Employee");
  });
}

exports.qDeleteCanDo = (req, res) =>{
  var employeeID = req.body.employeeID;
  var taskID = req.body.taskID;

  db.run(qDeleteCanDo, [employeeID,taskID], (err) =>{
    errorDeleteCheck(err,res,"Can Do");
  });
}
//TODO::test
exports.deleteNotAvailable = (req,res) =>{
  var empID = req.body.employeeID;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var day = req.body.day;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;

  db.run(qDeleteNotAvailable, [empID,start_time,end_time,day,start_date,end_date], (err) =>{
    errorDeleteCheck(err,res,"Not Available");
  });

}
//TODO::test
exports.deleteSchedule = (req,res) =>{
  var scheduleID = req.body.scheduleID;

  db.run(qDeleteScheudle, [scheduleID], (err) =>{
    errorDeleteCheck(err,res,"Schedule");
  });
}
//TODO::test
exports.deleteTOR = (req,res) =>{
  var torID = req.body.torID;

  db.run(qDeleteTOR, [torID], (err) =>{
    errorDeleteCheck(err,res,"TOR");
  });
}
//TODO::test
exports.deleteShiftX = (req,res) =>{
  var postID = req.body.postID;

  db.run(qDeleteShiftX,[postID], (err) =>{
    errorDeleteCheck(err,res,"ShiftX");
  });
}
