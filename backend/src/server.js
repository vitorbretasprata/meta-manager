const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const server = express();

const auth = require('./controllers/authController')
const db = require('./config/database')

const port = process.env.PORT || 2000;

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/api/auth', auth);

server.listen(port, () => {
    console.log(`Express listening on port ${port}...`)
});