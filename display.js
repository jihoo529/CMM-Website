const { table } = require('console');
var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname,'../');
const { db } = require(pathname + "etc/mysql");

router.get('/:name', (req, res)=>{

    const query = `SELECT name, content, content_id FROM contents`;
    console.log('loginname: ', req.params.name);
    var loginName = req.params.name;

    db.query(query, function(error, results){
        if (error) {
            res.status(500).send("error retrieving data")
        
        } else {
            res.status(200).send("success retieving data")
        }
    })
})

router.post('/post', express.urlencoded({ extended: true }), (req, res) =>{
    const content = req.body.content;
    const escapedContent = content.replace(/'/g, "''"); 
    
    const query = `INSERT INTO contents (user_id, name, content) VALUES (${req.session.userId}, '${req.session.loginName}', '${escapedContent}')`;

    db.query(query, function(err, result){
        if(err){
            res.status(404).send("404 Not Found")
            return;
        }
        else{ 
            res.redirect(200).send("success")
            res.redirect('/display/'+req.session.loginName);
        }
    })

    console.log(req.body.content);
})

module.exports = router;
