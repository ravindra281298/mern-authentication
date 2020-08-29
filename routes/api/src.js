const express = require('express');
const index = require('./index');
const login = require('./login');
const signup = require('./signup');


const app = express();

app.use('/', index);
app.use('/', login);
app.use('/', signup);

module.exports = app;