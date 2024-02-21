var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname, '../');
const { db } = require(pathname + "etc/mysql");
const session = require('express-session');


router.get('/signup_page', (req, res) => {
    //res.sendFile(pathname + "public/signup.html");
})

router.post('/signup', express.urlencoded({ extended: true }), (req,res) =>{
    var signUpEmail = req.body.signupemail;
    var signUpName = req.body.signupName;
    var signUpPassword = req.body.signupPassword;
    var signUpTeam = req.body.signupTeam;
    var isAdmin = req.body.isAdmin;

    var duplicateEmailQuery = "SELECT * FROM USERS WHERE EMAIL = ?"
    var duplicateNameQuery = "SELECT * FROM USERS WHERE NAME = ?";
    
    db.query(duplicateEmailQuery, [signUpEmail], function(err, emailResults){
        if(err){
            console.log(err);
            return;
        }
        if(emailResults.length > 0){
            res.send("An account with the same email already exists. Please login with your email");
        } else {
            db.query(duplicateNameQuery, [signUpName], function(err,nameResults){
                if (err) {
                    console.log(err);
                    return;
                }
                if (nameResults.length > 0) {
                    res.send("Username already exists, please choose a different username");
                } else {
                    var user = "INSERT INTO USERS (name, email, password, team, isAdmin) VALUES (?,?,?,?,?)";
                    db.query(user, [signUpName, signUpEmail, signUpPassword, signUpTeam, isAdmin], function(err, result) {
                        if (err) {
                            console.error('Error inserting record:', err);
                            res.status(500).send('Error registering username.');
                        } else {
                            res.status(200).send('Registered successfully');
                        }
                    });
                }
            });
        }
    }); 
})


module.exports = router;