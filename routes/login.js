var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname, '../');
const { db } = require(pathname + "etc/mysql");
const session = require('express-session');

router.get('/', (req, res) => {
  res.redirect('/login');
})

router.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  var loginName = req.body.loginName;
  var loginPW = req.body.loginPassword;
  var query = `SELECT * FROM USERS WHERE NAME = ?`;

  db.query(query, [loginName], function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    
    console.log(results[0])
    if (results[0]) {
      if (results[0].password == loginPW) {
        req.session.loginName = loginName;
        req.session.userId = results[0].ID;
        res.status(200).send('Success');
        return;
      }
    }
    res.status(404).send('404 Not Found');
  });
})

router.get('/logout', (req, res) => {
  req.session.loginName = null;
  req.session.userId = null;
  res.redirect('/');
})
module.exports = router;