const express = require('express');
const router = express.Router();
const db = require('./db').pool;

router.get('/', (req, res) => {
    let query = req.query;
    let team = query.team;
    db.query(`SELECT * FROM todo WHERE team ="${team}"`).then(sqlRes => {
        res.send({
            status: "OKAY",
            message: "TODO_FETCHED_SUCCESSFULLY",
            data: sqlRes[0]
        })
    })
})
router.patch('/', (req, res) => {
    let body = req.body;
    let id = body.id;
    let status = body.status;
    db.query(`UPDATE todo SET status="${status}" WHERE id = "${id}"`).then(sqlRes => {
        res.send({
            status: "OKAY",
            message: "TODO_UPDATED_SUCCESSFULLY",
            data: null
        })
    })
})
router.post('/', (req, res) => {
    let body = req.body;
    let id = body.id;
    let status = "request";
    let by = body.by;
    let title = body.title;
    let desc = body.description;
    let priority = body.priority;
    let team = body.team;
    db.query(`INSERT INTO todo (id,status,requestedby,title,description,priority,team) VALUES("${id}","request","${by}","${title}","${desc}","${priority}","${team}")`).then(sqlRes => {
        res.send({
            status: "OKAY",
            message: "TODO_UPDATED_SUCCESSFULLY",
            data: null
        })
    })
})
module.exports = router;