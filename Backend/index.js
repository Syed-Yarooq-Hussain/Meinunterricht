const express = require('express');
const bodyParser = require("body-parser");
const movieController = require('./src/controller/MovieController')

const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors({
    origin: '*',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('*', cors());

//Apis's
app.get('/getAllMovieList', movieController.getAllMovieList);
app.get('/movieDetail/:id', movieController.getMovieDetailById);
app.post('/addMoviesByKey', movieController.addMoviesInDatabaseByTitle);


app.listen(port, () => console.log(`Hello Meinunterricht app listening on port ${port}!`))
