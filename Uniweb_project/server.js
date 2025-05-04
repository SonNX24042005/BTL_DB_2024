require('dotenv').config()
const express = require('express')
const webRoutes = require('./routes/web');

//console.log(process.env);

const app = express()
const port = process.env.PORT_1 || 3000
const hostname = process.env.HOST_NAME

app.use('/', webRoutes)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})