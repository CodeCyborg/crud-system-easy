const express = require('express');
const cors = require('cors');
const db = require('./database/db')
const routesUsers = require('./routes/routesUsers')
// const controllers = require('./controllers');
// const verifyToken = require('./middlewares/verifyToken');

const app = express();


app.use(cors())
app.use(express.json())

app.use("/users", routesUsers)

// app.get('/user', verifyToken, controllers.getUserById)
// app.post('/register', controllers.register)
// app.post('/login', controllers.login)

const port = process.env.PORT || 8081;

app.listen(port, ()=>{
    console.log(`server (users) listening on port: ${port}`);
    db()
})

module.exports = app;