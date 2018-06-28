//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require('path');

const route = require('./routes/route');
//connect to mongoose db
mongoose.connect('mongodb://shiv:shiv123@ds018168.mlab.com:18168/connectus');
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
// const MongoClient = require('mongodb').MongoClient;
//
// // replace the uri string with your connection string.
// const uri = "mongodb://shiv:shiv123@ds018168.mlab.com:18168/connectus"
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("connectus").collection("UserInfo");
//    // perform actions on the collection object
//    client.close();
// });
//port no
const port = 4200;
//adding middleware
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files

app.use(express.static(path.join(__dirname,'/client')));


app.use('/api',route);
 //testing
 // ... other imports

// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || port,() => {
console.log('Server started at port :'+port);

});
