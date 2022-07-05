const router = require("express").Router();
const { watchlistAddMovie, getUserWatchlistData } = require("../models/models")

// get stored data of movies in watchlist
router.get("/", async (req, res) => {
    const user = req.body.user;
    const response = await getUserWatchlistData(user);
    res.json({ success: true, payload: response });
});

// post request to add selected movie to database along with users name
router.post("/", async (req, res) => {
    const user = req.body.user;
    const title = req.body.title;
    const response = await watchlistAddMovie(user, title);
    res.json({ success: true, payload: response})
})

module.exports = router;
