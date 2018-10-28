var express = require("express");
var login = require('./routes/loginroutes');
var addToDB = require('./routes/addtotableroutes')
var updateDB = require('./routes/updatetableroutes');
var searchDB = require('./routes/searchtableroutes');
var deleteFromDB = require('./routes/deletetableroutes');
var bodyParser = require('body-parser');
//TODO::look up morgan module
var morgan = require('morgan');
var app = express();
//used to parse incoming requests as json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//This allows server to cross domain requests
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));
var router = express.Router();

//test router
router.get('/', (req, res)=>{
  res.json({message: 'Welcome to our upload module apis'});
});
//two apis are defined here
//router.post('/register', login.register);
router.put('/login',login.login);
router.put('/signup',login.signup);
//use put when you don't want duplicates
router.put('/addTask',addToDB.addTask);
router.put('/addEmployee',addToDB.addEmployee);
router.put('/addNotAvailable',addToDB.addNotAvailable);
router.put('/addTOR',addToDB.addTOR);
router.put('/addShiftX',addToDB.addShiftX);
router.put('/addCanDo',addToDB.addCanDo);
router.put('/addSchedule',addToDB.addSchedule);

router.put('/updateTask',updateDB.updateTask);
router.put('/updateCanDo',updateDB.updateCanDo);

router.get('/getAllSchedule',searchDB.getAllSchedule);
router.put('/getCanDoByEmployeeID',searchDB.getCanDoByEmployeeID);
router.put('/getEmployeeAttributesByEmployeeID',searchDB.getEmployeeAttributesByEmployeeID);
router.put('/getShiftXByEmployeeID',searchDB.getShiftXByEmployeeID);
router.put('/getScheduleWithEmployees',searchDB.getScheduleWithEmployees);

router.post('/deleteTask',deleteFromDB.deleteTask);
app.use('/api', router);
app.listen(3000, '0.0.0.0');
