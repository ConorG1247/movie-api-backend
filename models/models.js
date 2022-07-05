const { movieData } = require("../schema/schema.js")


const getUserWatchlistData = async (user) => {
    const data = movieData.find({ user: user })
    return data;
}

// model to take user and title given from frontend body 
// saves this data in the DB to use later to show saved movies to watchlist
const watchlistAddMovie = async (user, title) => {
    const data = new movieData({
        user: user,
        title: title
    })
    
    // adds data to the mongo database
    const res = await data.save();

    return res;
}

  module.exports = {
    watchlistAddMovie: watchlistAddMovie,
    getUserWatchlistData: getUserWatchlistData,
  }