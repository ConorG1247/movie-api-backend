const router = require("express").Router();
const {
  watchlistAddMovie,
  getUserWatchlistData,
  deleteWatchlistMovie,
} = require("../models/models");
const { movieData } = require("../schema/schema.js");

// get stored data of movies in watchlist
router.get("/movie/:user", async (req, res) => {
  const user = req.params.user;
  const type = "movie"
  const response = await getUserWatchlistData(type, user);

  if (response.length !== 0) {
      res.json({ success: true, payload: response });
  }
});

router.get("/anime/:user", async (req, res) => {
  const user = req.params.user;
  const type = "anime"
  const response = await getUserWatchlistData(type, user);

  if (response.length !== 0) {
      res.json({ success: true, payload: response });
  }
});

router.post("/update", async (req, res) => {
  const data = await movieData.updateOne(
    { user: req.body.user, type: req.body.type },
    {
      $push: {
        data: {
          title: req.body.title,
          poster: req.body.poster,
          year: req.body.year,
          id: req.body.id,
        },
      },
    },
    { upsert: true }
  );
  res.json(data);
});

router.delete("/delete", async (req, res) => {
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
