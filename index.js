const express = require('express');
require('dotenv').config();
//routes
const customerRoute = require('./routes/customer')


const port = process.env.PORT || 7000;
const api = process.env.api

const app = express();
app.use(express.json())
app.get('/', (req, res, next) => {
    res.json('node server is running')
});

app.use(`${api}/customer`, customerRoute);

app.listen(port, () => console.log(`stripe server is running at http://localhost:${port}`))