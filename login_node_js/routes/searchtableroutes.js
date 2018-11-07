const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../../currTAPS.db', (err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the database');
});

let qSearchAllSchedule = 'SELECT * FROM schedule';
let qSearchEmployeeByID = 'SELECT * FROM employee WHERE employeeID = ?';
let qSearchCanDoByEmployeeID = 'SELECT * FROM can_do WHERE employeeID = ?';
let qSearchShiftXByEmployeeID = 'SELECT * FROM shiftX WHERE employeeID = ?';
let qSearchScheduleWithEmployees = 'SELECT * FROM schedule WHERE taskID = ? AND '+
                                   'start_time = ? AND end_time = ? AND task_date =?;';
let qSearchAllEmployees = 'SELECT * FROM employee;'

function searchErrorCheck(error,res,name,rows){
  if(error){
    errorMessage(error,res);
  }
  //if query ran fine
  else{
    console.log('found successfully');
    res.send(rows);
  }
}
function errorMessage(error,res){
    console.error(error.message);
    res.send({
      "code":400,
      "failed":"bad request"
    });
}
//make a json object with an array in each attribute
exports.getAllSchedule = (req,res) =>{
    db.all(qSearchAllSchedule, [], (err,rows) =>{
    searchErrorCheck(err,res,'get all employees',rows);
  });
}
exports.getAllEmployees = (req,res) =>{
	db.all(qSearchAllEmployees, [], (err,rows) =>{
		searchErrorCheck(err,res,'all employees',rows);
	});
}
//send json of taskID and employeeID based on inputed ID
exports.getCanDoByEmployeeID = (req,res) =>{
 console.log(req.body); 
 var employeeID = req.body.employeeID;
  db.all(qSearchCanDoByEmployeeID, [employeeID], (err,rows) =>{
    searchErrorCheck(err,res,'can do',rows);
  });
}
//send all employee information based off their ID
exports.getEmployeeAttributesByEmployeeID = (req,res) =>{
  var employeeID = req.body.employeeID;
  db.all(qSearchEmployeeByID, [employeeID], (err,rows) =>{
    searchErrorCheck(err,res,'employee',rows);
  });
}
//get all then requested shift exchanges based on an employee ID
exports.getShiftXByEmployeeID = (req,res) =>{
  var employeeID = req.body.employeeID;
  db.all(qSearchShiftXByEmployeeID, [employeeID], (err,rows) =>{
    searchErrorCheck(err,res,'shiftX',rows);
  });
}
//@return: object of task with employees involved
//@desc:: pass taskID,start_time,end_time,task_date of a clicked task and
exports.getScheduleWithEmployees = (req,res) =>{
  var TaskID = req.body.taskID;
  var Start_time = req.body.start_time;
  var End_time = req.body.end_time;
  var Task_date = req.body.task_date;
  var scheduleSend = {
    taskID: TaskID,
    start_time: Start_time,
    end_time: End_time,
    task_date:Task_date,
    task_name:'',
    day_of_week: '',
    employee:{
      employeeID: [],
      first_name: [],
      last_name: [],
      email: [],
      phone_number: []
    }
  }
  db.serialize(() =>{
    var employeeIDs = [];
    var employeesOfSpecificTask='SELECT * FROM employee WHERE employeeID in (';
    db.all(qSearchScheduleWithEmployees, [TaskID,Start_time,End_time,Task_date], (err,rows) =>{
      if(err) {
        errorMessage(err,res);
      }
      //if query ran fine
      else{
        scheduleSend.task_name = rows[0].task_name;
        scheduleSend.day_of_week = rows[0].day_of_week;
        rows.forEach((row) =>{
          employeeIDs.push(row.employeeID);
          employeesOfSpecificTask+='?,';
        });
        //employeeIDs=employeeIDs.substring(0,employeeIDs.length-1);
        //employeeIDs+=')';
        employeesOfSpecificTask = employeesOfSpecificTask.substring(0,employeesOfSpecificTask.length-1);
        employeesOfSpecificTask+=');';

        db.all(employeesOfSpecificTask,employeeIDs, (err1,innerRow) =>{
          if(err1) {
            errorMessage(err,res);
          }
          else{
            innerRow.forEach((row1) =>{
              //console.log('test '+ row1.first_name);
              scheduleSend.employee.employeeID.push(row1.employeeID);
              scheduleSend.employee.first_name.push(row1.first_name);
              scheduleSend.employee.last_name.push(row1.last_name);
              scheduleSend.employee.email.push(row1.email);
              scheduleSend.employee.phone_number.push(row1.phone_number);
            });
            res.send(scheduleSend);
          }
        });

      }
    });
  });
}
