  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./../Databases/TAPS.db', (err) =>{
    if(err){
      return console.error(err.message);
    }
    console.log('Connected to the database');
  });

let qSearchAllSchedule = 'SELECT * FROM schedule';

function searchErrorCheck(error,res,name){
  if(error) {
    console.error(error.message);
    res.send({
      "code":400,
      "failed":"bad request"
    });
  }
  //if query ran fine
  else{
    console.log('found successfully');
    res.send({
      "code":200,
      "success":name+" found successfully"
    });
  }
}
//make a json object with an array in each attribute
exports.getAllSchedule = (req,res) =>{
  var scheduleID = '';
  var taskID = '';
  var start_time = '';
  var end_time = '';
  var employeeID = '';
  var task_name = '';
  var task_date = '';
  var day_of_week = '';

  db.all(qSearchAllSchedule, [], (err,rows) =>{
    if(err){
      console.log('search error');
      throw err;
    }
    res.send(rows);
  });
}
