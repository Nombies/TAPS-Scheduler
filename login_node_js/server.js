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
router.post('/login',login.login);
router.post('/signup',login.signup);
//use put when you don't want duplicates
router.post('/addTask',addToDB.addTask);
router.post('/addEmployee',addToDB.addEmployee);
router.post('/addNotAvailable',addToDB.addNotAvailable);
router.post('/addTOR',addToDB.addTOR);
router.post('/addShiftX',addToDB.addShiftX);
router.post('/addCanDo',addToDB.addCanDo);
router.post('/addSchedule',addToDB.addSchedule);

router.post('/updateTask',updateDB.updateTask);
router.post('/updateCanDo',updateDB.updateCanDo);

router.get('/getAllSchedule',searchDB.getAllSchedule);
router.post('/getCanDoByEmployeeID',searchDB.getCanDoByEmployeeID);
router.post('/getEmployeeAttributesByEmployeeID',searchDB.getEmployeeAttributesByEmployeeID);
router.post('/getShiftXByEmployeeID',searchDB.getShiftXByEmployeeID);
router.post('/getScheduleWithEmployees',searchDB.getScheduleWithEmployees);

router.post('/deleteTask',deleteFromDB.deleteTask);
app.use('/api', router);
app.listen(4000, '0.0.0.0');
