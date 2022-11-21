const express = require('express')
const app = express();

app.use(require('cookie-parser')())
app.use(express.static('..'))