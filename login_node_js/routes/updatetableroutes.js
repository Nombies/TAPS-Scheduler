const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./../Databases/TAPS.db', (err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

//update task
let updateTask = 'UPDATE task SET name = ?, instructions = ? , '+
                  'earliest_start = ?, latest_end = ?, duration = ?,' +
                  'reps_in_week = ?, sunday = ?, monday = ?, tuesday = ?,'+
                  'wednesday = ?, thursday = ?, friday = ?, saturday = ?,'+
                  'employees_needed = ? WHERE taskID = ?;'

function errorUpdateCheck(error,res, name){
  if(error) {
    console.error(error.message);
    res.send({
      "code":400,
      "failed":"bad request"
    });
  }
  //if query ran fine
  else{
    console.log('update successfully');
    res.send({
      "code":200,
      "success":name+" update successfully"
    });
  }
}

exports.updateTask = (req, res) =>{
  var taskID = req.body.taskID;
  var name = req.body.name;
  var instructions = req.body.instructions;
  var earliest_start = req.body.earliest_start;
  var latest_end = req.body.latest_end;
  var duration = req.body.duration;
  var reqs_in_week = req.body.reqs_in_week;
  var sunday = req.body.sunday;
  var monday = req.body.monday;
  var tuesday = req.body.tuesday;
  var wednesday = req.body.wednesday;
  var thursday = req.body.thursday;
  var friday = req.body.friday;
  var saturday = req.body.saturday;
  var employees_needed = req.body.employees_needed;
  console.log("name: " + name + " instructions: " + instructions + "\n" );
  db.run(updateTask, [name,instructions,earliest_start,latest_end,duration,
  reqs_in_week,sunday,monday,tuesday,wednesday,thursday,friday,saturday,
  employees_needed,taskID], (err) =>{
    //If error occurs with json post request
    errorUpdateCheck(err,res,"Task");
  });
}
