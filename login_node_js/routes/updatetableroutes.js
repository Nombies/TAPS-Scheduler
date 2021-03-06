
const sqlite3 = require('sqlite3').verbose();
var bcrypt = require('bcrypt');

let db = new sqlite3.Database('../../currTAPS.db', (err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

//update task
let qUpdateTask = 'UPDATE task SET name = ?, instructions = ? , '+
                  'earliest_start = ?, latest_end = ?, duration = ?,' +
                  'reps_in_week = ?, sunday = ?, monday = ?, tuesday = ?,'+
                  'wednesday = ?, thursday = ?, friday = ?, saturday = ?,'+
                  'employees_needed = ?, priority = ?, delete_after = ? WHERE taskID = ?;';
let qUpdateCanDo = 'UPDATE can_do SET employeeID = ?, taskID = ? WHERE '+
                  'employeeID = ? AND taskID = ?;';

let qUpdateEmployee = 'UPDATE employee SET first_name = ?, middle_name = ?, last_name = ?, ' +
		     'email = ?, phone_number = ?, modify_task = ?, ' +
		     'modify_emp_attr = ?, username = ?, preffered_hours = ? WHERE employeeID = ?;';

let qUpdateNotAvailable = 'UPDATE not_available SET start_time=?,end_time=?,'+
			  'day=?, start_date=?, end_date=? WHERE employeeID=?'+
                          'AND start_time=? AND end_time=? AND day=? AND '+
                          'start_date=? AND end_date=?';

let qUpdateSchedule = 'UPDATE schedule SET taskID=?,start_time=?,end_time=?,'+
		      'employeeID=?,task_name=?,task_date=?,day_of_week=?'+
		      'WHERE scheduleID=?;';

let qUpdateTOR = 'UPDATE TOR SET employeeID=?,subject=?,reason=?,start_time=?,'+
		 'end_time=?,start_date=?,end_date=?,request_status=?,'+
		 'supervisor_comment=? WHERE torID=?;';

let qUpdateShiftX = 'UPDATE shiftX SET employeeID=?,taskID=?,shift_date=? '+
		    'WHERE postID=?;';

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
  var priority = req.body.priority;
  var delete_after = req.body.delete_after;
  var token = req.body.token;

  db.serialize(()=>{
                db.get('SELECT * FROM employee ' +
                        'WHERE token = ?', [token], (err,row)=>{
                        console.log('value of row ' + JSON.stringify(row))
                        if(typeof row === 'undefined' || row.modify_task == 0){
                                console.log('is row null')
                                res.send({
                                "code":403,
                                "failed":"User does not have valid session"
                                });
                                console.log('message sent');
                                valid = 0;
                        }
			else{
				db.run(qUpdateTask, [name,instructions,earliest_start,latest_end,duration,
 					 reqs_in_week,sunday,monday,tuesday,wednesday,thursday,friday,saturday,
  					 employees_needed,priority,delete_after,taskID], (err) =>{
    					 //If error occurs with json post request
   						 errorUpdateCheck(err,res,"Task");
  				});

			}

                })
   })
}

exports.updateCanDo = (req,res) =>{
  var prevEmployeeID = req.body.prevEmployeeID;
  var prevTaskID = req.body.prevTaskID;
  var nEmpID = req.body.newEmployeeID;
  var nTaskID = req.body.newTaskID;
  var token = req.body.token;
  db.serialize(()=>{
                db.get('SELECT * FROM employee ' +
                        'WHERE token = ?', [token], (err,row)=>{
                        console.log('value of row ' + JSON.stringify(row))
                        if(typeof row === 'undefined'){
                                console.log('is row null')
                                res.send({
                                "code":403,
                                "failed":"User does not have valid session"
                                });
                                console.log('message sent');
                                valid = 0;
                        }
                        else{
				db.run(qUpdateCanDo,[nEmpID,nTaskID,prevEmployeeID,prevTaskID], (err) =>{
    					errorUpdateCheck(err,res,'Can Do');
  				});
                                /*db.run(qUpdateCanDo, [name,instructions,earliest_start,latest_end,duration,
                                         reqs_in_week,sunday,monday,tuesday,wednesday,thursday,friday,saturday,
                                         employees_needed,priority,delete_after,taskID], (err) =>{
                                         //If error occurs with json post request
                                                 errorUpdateCheck(err,res,"Task");
                                });*/

                        }

                })
   })
/*
  db.run(qUpdateCanDo,[nEmpID,nTaskID,prevEmployeeID,prevTaskID], (err) =>{
    errorUpdateCheck(err,res,'Can Do');
  });
*/
}

exports.updateEmployee = (req,res) =>{
  var employeeID = req.body.employeeID;
  var first_name = req.body.first_name;
  var middle_name = req.body.middle_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  var modify_task = req.body.modify_task;
  var modify_emp_attr = req.body.modify_emp_attr;
  var username = req.body.username;
  var preffered_hours = req.body.preffered_hours;
  //var salt = req.body.salt;
  //var password = req.body.password;
  console.log(req.body);
  //var passHash = bcrypt.hashSync(password,salt);

  var token = req.body.token;

  db.serialize(()=>{
                db.get('SELECT * FROM employee ' +
                        'WHERE token = ?', [token], (err,row)=>{
                        console.log('value of row ' + JSON.stringify(row))
                        if(typeof row === 'undefined' || row.modify_emp_attr == 0){
                                console.log('is row null')
                                res.send({
                                "code":403,
                                "failed":"User does not have valid session"
                                });
                                console.log('message sent');
                                valid = 0;
                        }
                        else{
                             db.run(qUpdateEmployee, [first_name,middle_name,last_name,email,phone_number,modify_task,
  				modify_emp_attr,username,preffered_hours,employeeID],(err) =>{
    				errorUpdateCheck(err,res,'Employee');
  			     });

                        }

                })
   })
/*
  db.run(qUpdateEmployee, [first_name,middle_name,last_name,email,phone_number,modify_task,
  modify_emp_attr,username,preffered_hours,employeeID],(err) =>{
    errorUpdateCheck(err,res,'Employee');
  });*/
}

exports.updateNotAvailable = (req,res) =>{
  var empID = req.body.employeeID;
  var old_start_time = req.body.old_start_time;
  var old_end_time = req.body.old_end_time;
  var old_day = req.body.old_day;
  var old_start_date = req.body.old_start_date;
  var old_end_date = req.body.old_end_date;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var day = req.body.day;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;

  db.run(qUpdateNotAvailable, [start_time,end_time,day,start_date,end_date,
  empID,old_start_time,old_end_time,old_day,old_start_date,old_end_date],
  (err) =>{
   errorUpdateCheck(err,res,'Not Available');
  });
}

exports.updateSchedule = (req,res) =>{
  var scheduleID = req.body.scheduleID;
  var taskID = req.body.taskID;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var employeeID = req.body.employeeID;
  var task_name = req.body.task_name;
  var task_date = req.body.task_date;
  var day_of_week = req.body.day_of_week;

  db.run(qUpdateSchedule,[taskID,start_time,end_time,employeeID,task_name,
  task_date,day_of_week,scheduleID], (err) =>{
    errorUpdateCheck(err,res,'Schedule');
  });
}

exports.updateTOR = (req,res) =>{
  var torID = req.body.torID;
  var employeeID = req.body.employeeID;
  var subject = req.body.subject;
  var reason = req.body.reason;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var request_status = req.body.request_status;
  var supervisor_comment = req.body.supervisor_comment;

 db.run(qUpdateTOR,[employeeID,subject,reason,start_time,end_time,start_date,
  end_date,request_status,supervisor_comment,torID],(err)=>{
    errorUpdateCheck(err,res,'TOR');
  });
}

exports.updateShiftX = (req,res) =>{
  var postID = req.body.postID;
  var employeeID = req.body.employeeID;
  var taskID = req.body.taskID;
  var shift_date = req.body.shift_date;

  db.run(qUpdateShiftX,[employeeID,taskID,shift_date,postID],(err)=>{
    errorUpdateCheck(err,res,'ShiftX');
  });
}
