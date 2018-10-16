var express = require("express");
var login = require('./routes/loginroutes');
var addToDB = require('./routes/addtotableroutes')
var updateDB = require('./routes/updatetableroutes');
var deleteFromDB = require('./routes/deletetableroutes');
var bodyParser = require('body-parser');

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

var router = express.Router();

//test router
router.get('/', (req, res)=>{
  res.json({message: 'Welcome to our upload module apis'});
});
//two apis are defined here
//router.post('/register', login.register);
router.post('/login',login.login);

router.post('/addTask',addToDB.addTask);
router.post('/addCanDo',addToDB.addCanDo);
router.post('/addSchedule',addToDB.addSchedule);
router.post('/addTOR',addToDB.addTOR);
router.post('/addShiftX',addToDB.addShiftX);

router.post('/updateTask',updateDB.updateTask);
router.post('/updateCanDo',updateDB.updateCanDo);

router.post('/deleteTask',deleteFromDB.deleteTask);
app.use('/api', router);
app.listen(5000);
