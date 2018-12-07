const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../../currTAPS.db', (err) =>{
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
let qAddTask = 'INSERT INTO task VALUES ((SELECT MAX(taskID)+1 as currNumber FROM task),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
let qAddCanDo = 'INSERT INTO can_do VALUES (?,?);';
let qAddNotAvailable = 'INSERT INTO not_available VALUES (?,?,?,?,?,?);';
let qAddSchedule = 'INSERT INTO schedule VALUES ((SELECT MAX(scheduleID)+1 as currNumber FROM schedule),?,?,?,?,?,?,?);';
let qAddTOR = 'INSERT INTO TOR VALUES ((SELECT MAX(torID)+1 as currNumber FROM TOR),?,?,?,?,?,?,?,?,?);';
let qAddEmployee = 'INSERT INTO employee(employeeID,first_name,last_name,email,'+
                    'phone_number,modify_task,modify_emp_attr,username,salt,'+
                    'password_hash,preffered_hours) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
let qAddShiftX = 'INSERT INTO shiftX VALUES ((SELECT MAX(postID)+1 as currNumber FROM shiftX),?,?,?);';
let qAddWeekHr = 'INSERT INTO weekhr VALUES (?,?,?);';

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
  var priority = req.body.priority;
  var delete_after = req.body.delete_after;
  console.log(req.body);
  db.run(qAddTask, [name,instructions,earliest_start,latest_end,duration,reqs_in_week,
    sunday,monday,tuesday,wednesday,thursday,friday,saturday,employees_needed,priority,delete_after], (err) =>{
      addErrorCheck(err,res, "Task");
    });
}

exports.addCanDo = (req,res) =>{
  var empID = req.body.employeeID;
  var taskID = req.body.taskID;

  console.log(empID + ' '+ taskID);
  db.run(qAddCanDo, [empID,taskID], (err) =>{
    addErrorCheck(err,res,"Can Do");
  });
}

exports.addNotAvailable = (req,res) =>{
  var empID = req.body.employeeID;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var day = req.body.day;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;

  db.run(qAddNotAvailable, [empID,start_time,end_time,day,start_date,end_date], (err) =>{
    addErrorCheck(err,res,"Not Available");
  });
}

exports.addSchedule = (req,res) =>{
  var taskID = req.body.taskID;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var employeeID = req.body.employeeID;
  var task_name = req.body.task_name;
  var task_date = req.body.task_date;
  var day_of_week = req.body.day_of_week;

  db.run(qAddSchedule, [taskID,start_time,end_time,employeeID,task_name,task_date,day_of_week], (err) =>{
    addErrorCheck(err,res,"Schedule");
  });
}
//TODO::add supervisor_comment as optional
exports.addTOR = (req,res) =>{
  var employeeID = req.body.employeeID;
  var subject = req.body.subject;
  var reason = req.body.reason;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var request_status  = req.body.request_status;
  var supervisor_comment = req.body.supervisor_comment;

  db.run(qAddTOR,[employeeID,subject,reason,start_time,end_time,start_date,end_date,request_status,supervisor_comment], (err) =>{
    addErrorCheck(err,res,"TOR");
  });
}

exports.addShiftX = (req,res) =>{
  var employeeID = req.body.employeeID;
  var taskID = req.body.taskID;
  var shift_date = req.body.shift_date;

  db.run(qAddShiftX,[employeeID,taskID,shift_date], (err) =>{
    addErrorCheck(err,res,"ShiftX");
  });
}

exports.addWeekHr = (req,res) =>{
  var employeeID = req.body.employeeID;
  var hrs = req.body.hrs;
  var startWeek = req.body.startWeek;

  db.run(qAddWeekHr,[employeeID,hrs,startWeek], (err) =>{
    addErrorCheck(err,res,"WeekHr");
  });

}
