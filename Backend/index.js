const express = require('express');
const bodyParser = require("body-parser");

const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors({
    origin: '*',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('*', cors());


app.listen(port, () => console.log(`Hello Meinunterricht app listening on port ${port}!`))
