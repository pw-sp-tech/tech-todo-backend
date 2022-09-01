const express = require('express');
const bodyParser = require("body-parser")


const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    const host = req.headers.origin;
    if (host) {
        res.setHeader('Access-Control-Allow-Origin', host);
    }

    res.setHeader('Access-Control-Allow-Headers', ['content-type', 'authorization']);
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'DELETE']);
    next();
})
const authRouter = require('./auth');
const todoRouter = require('./todo');
const teamsRouter = require('./teams');
const memRouter = require('./memberships');
app.use('/auth', authRouter);
app.use('/todo', todoRouter);
app.use('/teams', teamsRouter);
app.use('/memberships', memRouter);

app.listen(3000, () => {
    console.log("server started on port 3000")
})