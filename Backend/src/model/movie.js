const db = require('../config/dbConfig')
const axios = require('axios')

exports.getMoviesByTitle = async function (title, page, year) {
    const response = await axios({
        url: `http://www.omdbapi.com/?s=${title}&y=${year}&page=1&apikey=7b1d1da`,
        method: "get",
    });

    return response.data;
}

exports.getMovieDetailById = async function (id) {
    const response = await axios({
        url: `http://www.omdbapi.com/?i=${id}&apikey=7b1d1da`,
        method: "get",
    });

    return response.data;
}

exports.updateInernalDataById = async function (id, director, plot) {
        return await db.query("UPDATE movies SET director= $1, plot = $2 where id = $3 RETURNING *",
            [director , plot , id])
            .catch(err => console.log(err));
}

exports.saveRecordInternally = async function (listofmovies) {
    listofmovies.Search.map(async d => {
        await db.query("INSERT INTO movies( title, year, imdbID, type, poster, director, plot) VALUES ($1, $2, $3, $4, $5, null, null) RETURNING *",
            [d.Title, d.Year, d.imdbID, d.Type, d.Poster])
            .catch(err => console.log(err));
    })
}

exports.checkIsInserted = async function (title, year) {
    return await db.query("SELECT * FROM inserted_history WHERE title Ilike $1 and year =$2 ",
        ['%' + title + '%', year])
        .catch(err => console.log(err));
}

exports.updateInsertedHistory = async function (title, year) {
    await db.query("INSERT INTO inserted_history(title, year) VALUES ($1, $2) RETURNING *",
        [title, year])
        .catch(err => console.log(err));
}


exports.getAllMovieList = async function(title = ''){
    return await db.query("SELECT * FROM movies WHERE title Ilike $1",
        ['%' + title + '%'])
        .catch(err => console.log(err));
}

exports.getMovieById = async function(id){
    console.log(id)
    return await db.query("SELECT * FROM movies WHERE id = $1",
        [id])
        .catch(err => console.log(err));
}
