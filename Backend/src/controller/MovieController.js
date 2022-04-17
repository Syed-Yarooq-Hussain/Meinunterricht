const db = require('../config/dbConfig')
const { getMoviesByTitle, saveRecordInternally, checkIsInserted, updateInsertedHistory ,getAllMovieList
    , getMovieById, getMovieDetailById, updateInernalDataById } = require('../model/movie')
const axios = require('axios')


exports.getAllMovieList = async function (req, res) {
    try {
        let title = req.query.title ?? ''
        let movies = await getAllMovieList(title);


        return res.status(200).json({ code: 200, data: movies.rows, message: 'Successfully get list of URLS' })
    } catch (e) {
        return res.status(500).json({ code: 500, error: e, message: 'Server Error' })
    }
}

exports.getMovieDetailById = async function (req, res) { 
    try{
        let id = req.params.id;
        
        let movie = await getMovieById(id);

        if(!movie.rows[0].plot){
            let imdpData = await  getMovieDetailById(movie.rows[0].imdbid)
            movie = await updateInernalDataById(id, imdpData.Director, imdpData.Plot)
        }

        return res.status(200).json({ code: 200, data: movie.rows[0],  message: 'Successfully get list of URLS' })

    }catch(e){
        console.log(e)
        return res.status(500).json({ code: 500, error: e, message: 'Server Error' })
    }
}

exports.addMoviesInDatabaseByTitle = async function (req, res) {
    try {
        const { title, year } = req.body;

        if(!title || !year){
            return res.status(400).json({ code: 400, error: e, message: 'Invalid Request' })
        }

        totalPage = 1;

        let isExistingSearch = await checkIsInserted(title, year)

        if (isExistingSearch.rows[0]) {
            return res.status(200).json({ code: 200, data: [], message: 'Result Already Exist' })
        }

        let listofmovie = await getMoviesByTitle(title, page, year)

        if (listofmovie.Error && listofmovie.Error == 'Movie not found!') {
            return res.status(200).json({ code: 200, data: [], message: 'Movie not available in current year' })
        }

        totalPage = Math.ceil((+listofmovie.totalResults) / 10)

        await saveRecordInternally(listofmovie)
        for (let page = 2; page <= totalPage; page++) {
            listofmovie = await getMoviesByTitle(title, page, year)
            await saveRecordInternally(listofmovie)
        }

        updateInsertedHistory(title, year)

        return res.status(200).json({ code: 200, data: [], message: 'Successfully get list of movies' })
    } catch (e) {
        return res.status(500).json({ code: 500, error: e, message: 'Server Error' })
    }
}
