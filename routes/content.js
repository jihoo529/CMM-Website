var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname, '../');
const { db } = require(pathname + "etc/mysql");
const session = require('express-session');


router.put('/edit/:contentID', express.urlencoded({ extended: true }), (req, res) => {
    var contentID = req.params.contentID;
    var editedContent = req.body.content;
    var escapedContent = editedContent.replace(/'/g, "''");

    var query = `UPDATE contents SET content = '${escapedContent}' WHERE contentID = ${contentID}`;

    db.query(query, function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating content");
        } else {
            res.status(200).send("Content updated successfully");
        }
    });
});

module.exports = router;