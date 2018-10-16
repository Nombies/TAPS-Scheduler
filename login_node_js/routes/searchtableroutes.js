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
      throw err;
    }
    rows.forEach((row)=>{
      console.log( scheduleID += (row.scheduleID + ','));
        taskID += (row.taskID + ',');
        start_time += (row.start_time + ',');
        end_time += (row.end_time + ',');
        employeeID += (row.employeeID + ',');
        task_name += (row.task_name + ',');
        task_date += (row.task_date + ',');
        day_of_week += (row.day_of_week + ',');
    });
    //remove last comma
    scheduleID = scheduleID.substring(0,scheduleID.length - 1);
    taskID = taskID.substring(0,taskID.length - 1);
    start_time = start_time.substring(0,start_time.length - 1);
    end_time = end_time.substring(0,end_time.length - 1);
    employeeID = employeeID.substring(0,employeeID.length - 1);
    task_name = task_name.substring(0,task_name.length - 1);
    task_date = task_date.substring(0,task_date.length - 1);
    day_of_week = day_of_week.substring(0,day_of_week.length - 1);
    console.log('test' + scheduleID);
    res.send({
      'scheduleID': '['+scheduleID+']',
      'taskID': '['+taskID+']',
      'start_time':'['+start_time+']',
      'end_time':'['+end_time+']',
      'employeeID':'['+employeeID+']',
      'task_name':'['+task_name+']',
      'task_date':'['+task_date+']',
      'day_of_week':'['+day_of_week+']'
    });
  });
}
