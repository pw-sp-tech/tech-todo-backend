const express = require('express');
const router = express.Router();
const db = require('./db').pool;

router.get('/', (req, res) => {
    db.query(`select ms.* ,users.name from  bugs.memberships as ms left join bugs.users as users  on ms.user=users.id`).then(sqlRes => {
        res.send({
            status: "OKAY",
            message: "DATA_FETCHED_SUCCESSFULLY",
            data: sqlRes[0]
        });
    })
})

module.exports = router;