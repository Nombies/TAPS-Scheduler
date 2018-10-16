const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./../Databases/TAPS.db', (err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

let deleteTask = 'DELETE task WHERE taskID = ?;'

exports.deleteTask = (req, res) =>{
  var taskID = req.body.taskID;

  db.run(updateTask, [taskID], (err) =>{
    if(err) {
      return console.error(err.message);
    }
    console.log('Deleted row: ${this.changes}');
    db.end();
  });
}
