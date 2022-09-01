const express = require('express');
const router = express.Router();
const db = require('./db').pool;

router.get('/', (req, res) => {
    db.query(`SELECT * FROM memberships`).then(sqlRes => {
        res.send({
            status: "OKAY",
            message: "DATA_FETCHED_SUCCESSFULLY",
            data: sqlRes[0]
        });
    })
})

module.exports = router;