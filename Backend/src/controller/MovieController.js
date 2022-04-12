const db = require('../config/dbConfig')
const axios = require('axios')


exports.getAllMovieList = async function (req, res) {
    try {
        const response = await axios({
			url: "http://www.omdbapi.com/?s=space&y=2001&page=1&apikey=7b1d1da",
			method: "get",
		});

        return res.status(200).json({ code: 200, data: response.data, message: 'Successfully get list of URLS' })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ code: 400, error: e, message: 'something went wrong' })
    }    
}
