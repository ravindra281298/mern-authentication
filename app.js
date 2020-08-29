const express = require("express");
const mongoose = require("mongoose");
const api = require('./routes/api/src');
const db = require('./config/keys').mongoURI;

const app = express();
const port = 3000;

mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => { console.log("mongoDB connected successfully")})
    .catch(err => console.log(err));



app.set('view engine', 'ejs');


app.use('/',api);

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
});
