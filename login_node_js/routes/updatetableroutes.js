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
                  'wednesday = ?, thursday = ?, friday = ?, saturday = ?'+
                  'employees_needed = ? WHERE taskID = ?;'

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

  db.run(updateTask, [name,instructions,earliest_start,latest_end,duration,
  reqs_in_week,sunday,monday,tuesday,wednesday,thursday,friday,saturday,
  employees_needed,taskID], (err) =>{
    if(err) {
      return console.error(err.message);
    }
    console.log('Row upated: ${this.changes}');
    db.end();
  })
}
