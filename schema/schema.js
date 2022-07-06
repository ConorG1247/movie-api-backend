const mongoose = require("mongoose");

// folder schema for logged in users
const movieArraySchema = new mongoose.Schema({
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
});

const userMovieSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  type: {
    type: String,
  },
  data: [movieArraySchema]
})

const movieData = mongoose.model("movieData", userMovieSchema);

module.exports = {
  movieData,
};
