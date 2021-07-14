const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// start creating app with express
const app = express();

// parse requests of content-type
app.use(bodyParser.urlencoded({extended:true}));

// parse requests of content-type: app/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// connect to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser:true
}).then(()=>{
    console.log('connected to db');
}).catch(err=>{
    console.log('could not connect to the db', err);
    process.exit();
});


// a simple route
app.get('/', (req, res) =>{
    res.json({
        "message": "Welcome to Node RestAPI"
    });
});

// require notes routes
require('./app/routes/note.routes.js')(app)

app.listen(3000, ()=>{
    console.log("server listening on port 3000...");
});