var express = require("express");
var login = require('./routes/loginroutes');
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
app.use('/api', router);
app.listen(5000);
