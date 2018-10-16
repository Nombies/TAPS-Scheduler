const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./../Databases/TAPS.db', (err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});
//Insert Queries
//'INSERT INTO task(taskID, name,instructions,earliest_start,'+
//              'latest_end,duration,reps_in_week,sunday,monday,tuesday,wednesday,'+
//              'thursday,friday,saturday,employees_needed)'+
//              'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
let addTask = 'INSERT INTO task VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
//let addCanDo = 'INSERT INTO can_do(employeeID,taskID) VALUES (?,?);';
let addCanDo = 'INSERT INTO can_do VALUES (?,?);';

function addErrorCheck(error,res,name){
  if(error) {
    console.error(error.message);
    res.send({
      "code":400,
      "failed":"bad request"
    });
  }
  //if query ran fine
  else{
    console.log('added successfully');
    res.send({
      "code":200,
      "success":name+" added successfully"
    });
  }
}

exports.addTask = (req,res) =>{
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
  console.log(taskID + " " + name + "\n");
  db.run(addTask, [taskID,name,instructions,earliest_start,latest_end,duration,reqs_in_week,
    sunday,monday,tuesday,wednesday,thursday,friday,saturday,employees_needed], (err) =>{
      addErrorCheck(err,res, "Task");
    });
}

exports.addCanDo = (req,res) =>{
  var empID = req.body.employeeID;
  var taskID = req.body.taskID;

  console.log(empID + ' '+ taskID);
  db.run(addCanDo, [empID,taskID], (err) =>{
    addErrorCheck(err,res,"Can Do");
  });
}
/*

exports.FUNCTIONNAME = function(req,res) {
  //make variables for each attribute in table
  var attributeOne = req.body.ATTRIBUTE_NAME_FROM_POST_REQUEST

  db.run(QUERY_VARIABLE, [ARRAY OF ATTRIBUTE VARIABLES], (err) =>{
    if(err){
      console.log(err.message);
      res.send({
        "code":400,
        "failed":"error occured"
      });
    }
    //TODO::check if duplicates
    else{
      //Sent successfull
      res.send({
        "code":200,
        "success":"added successfull"
      });
    }
  });
}
*/
