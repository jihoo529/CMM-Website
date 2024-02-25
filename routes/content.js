var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname, '../');
const { db } = require(pathname + "etc/mysql");
const session = require('express-session');

//write your APIs; upload-post, delete-post, edit-post
router.post('/upload-post', express.urlencoded({ extended: true }), (req, res) => {
    const content = req.body.content;
    const escapedContent = content.replace(/'/g, "''"); //escapted ' => single quote using ''
    
    const query = `INSERT INTO contents (user_id, name, content) VALUES (${req.session.userId}, '${req.session.loginName}', '${escapedContent}')`;

    db.query(query, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/display');
        }
    })
    console.log(req.body.content);
})



//delete-post, edit-post...

module.exports = router;