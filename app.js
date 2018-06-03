//importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require('path');

const route = require('./routes/route');
//connect to mongoose db
mongoose.connect('mongodb://localhost:27017/contactlist');
//on connected
mongoose.connection.on('connected',()=>{
console.log('connected to @27017');
});
//on error
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('error is ' + err);
    }
});
//port no
const port = 3000;
//adding middleware
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files

app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);
 //testing 
 app.get('/',(req,res)=>{
     res.send('foobar');
 });
app.listen(port,() => {
console.log('Server started at port :'+port);

});