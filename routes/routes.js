const router = require("express").Router();
const { watchlistAddMovie, getUserWatchlistData } = require("../models/models")

// get stored data of movies in watchlist
router.get("/:user", async (req, res) => {
    const user = req.params.user;
    const response = await getUserWatchlistData(user);
    res.json({ success: true, payload: response });
});

// post request to add selected movie to database along with users name
router.post("/", async (req, res) => {
    const body = req.body
    const response = await watchlistAddMovie(body);
    res.json({ success: true, payload: response})
})

module.exports = router;
