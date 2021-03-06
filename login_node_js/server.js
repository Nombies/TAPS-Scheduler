//var fs = require('fs');
//var http = require('http');
//var https = require('https');
//var privateKey = fs.readFileSync('../../server.key','utf8');
//var certificate = fs.readFileSync('../../server.cert','utf8');
//var credentails = {key:privateKey,cert:certificate};

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
router.post('/addNotAvailable',addToDB.addNotAvailable);
router.post('/addTOR',addToDB.addTOR);
router.post('/addShiftX',addToDB.addShiftX);
router.post('/addCanDo',addToDB.addCanDo);
router.post('/addSchedule',addToDB.addSchedule);

router.post('/updateTask',updateDB.updateTask);
router.post('/updateCanDo',updateDB.updateCanDo);
router.post('/updateEmployee',updateDB.updateEmployee);
router.post('/updateNotAvailable',updateDB.updateNotAvailable);
router.post('/updateSchedule',updateDB.updateSchedule);
router.post('/updateTOR',updateDB.updateTOR);
router.post('/updateShiftX',updateDB.updateShiftX);

router.get('/getAllTasks',searchDB.getAllTasks);
router.get('/getAllSchedule',searchDB.getAllSchedule);
router.get('/getAllEmployees',searchDB.getAllEmployees);
router.get('/getAllCanDo',searchDB.getAllCanDo);
router.get('/getAllNotAvailable',searchDB.getAllNotAvailable);
router.get('/getAllWeekHr',searchDB.getAllWeekHr);
router.get('/getTOR',searchDB.getTOR);

router.post('/getCanDoByEmployeeID',searchDB.getCanDoByEmployeeID);
router.get('/getEmployeeAttributesByEmployeeID',searchDB.getEmployeeAttributesByEmployeeID);
router.post('/getShiftXByEmployeeID',searchDB.getShiftXByEmployeeID);
router.post('/getScheduleWithEmployees',searchDB.getScheduleWithEmployees);
router.post('/getTORByID',searchDB.getTORByID);
router.post('/getNotAvailableByEmployeeID',searchDB.getNotAvailableByEmployeeID);

router.post('/deleteTask',deleteFromDB.deleteTask);
router.post('/deleteEmployee',deleteFromDB.deleteEmployee);
router.post('/deleteCanDo',deleteFromDB.deleteCanDo);
router.post('/deleteNotAvailable',deleteFromDB.deleteNotAvailable);
router.post('/deleteSchedule',deleteFromDB.deleteSchedule);
router.post('/deleteTOR',deleteFromDB.deleteTOR);
router.post('/deleteShiftX',deleteFromDB.deleteShiftX);

app.use('/api', router);
app.listen(4000, '0.0.0.0');

//var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentails,app);

//httpServer.listen(5000,'0.0.0.0');
//httpsServer.listen(4500,'0.0.0.0');
