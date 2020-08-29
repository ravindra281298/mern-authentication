const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');
const user = require('../../models/users');




const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/login', (req,res) => {
    res.render('login');
})


//@router POST /login
//@desc Login user and return JWT token
//@access Public
app.post("/login", (req,res) => {

    if(!req.body || !req.body.email || !req.body.password) {
        res.status(400).json({error:'Enter valid data!!'});
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email

    user.findOne({ email }).then(users => {
        if(!users) {
            return res.status(400).json({ emailnotfound: "Email not found"});
        }

        bcrypt.compare(password,users.password).then((match) => {
            if(match) {

                const payload = {
                    name: users.name
                };

                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in second
                    },
                    (err, token) => {
                        // console.log(token);
                        res.json({
                            success: true,
                            token: "Bearer "+ token
                        });
                    }
                )
                res.send(`Hi ${users.name}, You have successfully logged in.`);
            }
            else {
                return res
                .status(400)
                .json({ passwordincorrect: "passwor incorrect"});
            }
        });
 
    });
});

module.exports = app;