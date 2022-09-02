const express = require('express');
const { v4: uuid } = require('uuid')
const router = express.Router();
const db = require('./db').pool;

function makeToken(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
router.post('/login', (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    if (!email || !password) {
        res.send({
            status: "ERROR",
            message: "MISSING_INFORMATION",
            data: null
        });
        return;
    }
    db.query(`SELECT * FROM users WHERE email="${email}" AND password="${password}"`).then(sqlRes => {
        if (sqlRes[0].length == 0) {
            res.send({
                status: "ERROR",
                message: "INVALID_CREDENTIALS",
                data: null
            });
            return;
        } else {
            let data = sqlRes[0][0];
            let token = makeToken(100);
            db.query(`UPDATE users SET token="${token}"`).then(sqlRes => {
                res.send({
                    status: "OKAY",
                    message: "LOGGED_IN_SUCCESSFULLY",
                    data: {
                        token,
                        id: data.id,
                        name: data.name,
                        email: data.email
                    }
                });
                return;
            })
        }
    })
});
router.post('/register', (req, res) => {
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const password = body.password;
    console.log(name, email, password)
    if (!name || !email || !password) {
        res.send({
            status: "ERROR",
            message: "MISSING_INFORMATION",
            data: null
        });
        return;
    }
    const uid = uuid();
    db.query(`INSERT INTO users(id,name,email,password) VALUES("${uid}","${name}","${email}","${password}")`).then(sqlRes => {
        const uid2 = uuid();
        db.query(`INSERT INTO memberships(id,team,user,role) VALUES("${uid2}","5c3e2679-76a8-4391-b673-9bfc9678760e","${uid}","client")`)
        res.send({
            status: "OKAY",
            message: "REGISTERED_SUCCESSFULLY",
            data: null
        });
    })
});

module.exports = router;