const express = require('express');
const router = express.Router();
const path = require('path');
const pathname = path.join(__dirname,'../');
const { db } = require(pathname + "etc/mysql");
const session = require('express-session');

// Configure session middleware

// Login POST route
router.post('/login', express.urlencoded({ extended: true }), (req, res) =>{
    const loginInfo = "<p>"+req.body.loginName+"</p><p>"+req.body.loginPassword+"</p>";
    const userName = req.body.loginName;
    const userPassword = req.body.loginPassword;
    const userQuery = `SELECT * FROM USERS WHERE NAME = ?`;
    
    db.query(userQuery, [userName], function(err, results){
        if(err){
            console.log(err);
            return;
        }
        console.log(results[0])
        console.log(results)
        
        if(results[0]){
            if(results[0].PASSWORD == userPassword){
                req.session.loginName = userName;
                req.session.userId = results[0].ID;
                res.redirect(`/display/${userName}`);
                return;
            }
        }
        res.sendFile(pathname + "public/login_fail.html");
    });   
})

// Signup page GET route
router.get('/signup_page', (req, res) => {
    res.sendFile(pathname + "public/signup.html");
})

// Logout GET route
router.get('/logout', (req, res) => {
    console.log("logout");
    req.session.loginName = null;
    req.session.userId = null;
    res.redirect('/');
})

// Root GET route
router.get('/', (req, res) => {
    res.sendFile(pathname + "public/login.html");
})

// Signup POST route
router.post('/signup')

module.exports = router;
