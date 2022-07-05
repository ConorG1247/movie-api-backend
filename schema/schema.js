const mongoose = require("mongoose");

// folder schema for logged in users
const movieUserData = new mongoose.Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  poster: {
    type: String,
  },
  year: {
    type: Number,
  },
  imdbID: {
    type: String,
  },
})

const movieData = mongoose.model("movieData", movieUserData);

module.exports = {
  movieData: movieData,
}
