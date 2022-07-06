const router = require("express").Router();
const {
  watchlistAddMovie,
  getUserWatchlistData,
  deleteWatchlistMovie,
} = require("../models/models");
const { movieData } = require("../schema/schema.js");

// get stored data of movies in watchlist
router.get("/:user", async (req, res) => {
  const user = req.params.user;
  const response = await getUserWatchlistData(user);

  if (response.length !== 0) {
      res.json({ success: true, payload: response });
  }
});

// // post request to add selected movie to database along with users name
// router.post("/", async (req, res) => {
//   const body = req.body;
//   const response = await watchlistAddMovie(body);
//   res.json({ success: true, payload: response });
// });

// // delete request to remove selected movie from users watchlist
// router.delete("/", async (req, res) => {
//   const id = req.body.id;
//   const response = await deleteWatchlistMovie(id);
//   res.json({ success: true, payload: `Deleted ${id} from the DB.` });
// });
 
router.post("/", async (req, res) => {
  const data = await movieData.updateOne(
    { user: req.body.user, type: req.body.type },
    {
      $push: {
        data: {
          title: req.body.title,
          poster: req.body.poster,
          year: req.body.year,
          imdbID: req.body.id,
        },
      },
    },
    { upsert: true }
  );

  res.json(data);
});

router.delete("/", async (req, res) => {
  const data = await movieData.updateOne(
    {
      user: req.body.user,
      type: req.body.type,
      "data._id": req.body.id,
    },
    { $pull: { data: { _id: req.body.id } } }
  );

  res.json({success: true});
});

module.exports = router;
