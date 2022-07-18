const { movieData } = require("../schema/schema.js")

const getUserWatchlistData = async (type, user) => {
    const data = movieData.find({ type: type, user: user
      })
    return data;
}

// model to take user and title given from frontend body 
// saves this data in the DB to use later to show saved movies to watchlist
const watchlistAddMovie = async (body) => {
    const data = new movieData({
        user: body.user,
        title: body.title,
        poster: body.poster,
        year: body.year,
        imdbID: body.imdbID,
    })
    
    // adds data to the mongo database
    const res = await data.save();

    return res;
}

const deleteWatchlistMovie = async (id) => {
  const data = movieData.findById({ _id: id });

  const res = await data.deleteOne();

  return res;
}

  module.exports = {
    watchlistAddMovie: watchlistAddMovie,
    getUserWatchlistData: getUserWatchlistData,
    deleteWatchlistMovie: deleteWatchlistMovie,
  }