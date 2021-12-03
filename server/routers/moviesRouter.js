const express = require('express')
const moviesBL = require('../models/movies/moviesBL');
const router = express.Router();

router.route('/')
    .get(async function (req, resp) {
        let data = await moviesBL.getAllMovies();
        return resp.json(data);
    })

router.route('/')
    .get(async function (req, resp) {
        let data = await moviesBL.getAllMovies();
        return resp.json(data);
    })

router.route('/:id')
    .get(async function (req, resp) {
        let id = req.params.id;
        let data = await moviesBL.getMovie(id);
        return resp.json(data);
    })

router.route('/')
    .post(async function (req, resp) {
        let obj = req.body;
        let status = await moviesBL.addMovie(obj);
        return resp.json(status);
    })

router.route('/:id')
    .put(async function (req, resp) {
        let obj = req.body;
        let id = req.params.id;
        let status = await moviesBL.updateMovie(id, obj);
        return resp.json(status.data);
    })

router.route('/:id')
    .delete(async function (req, resp) {
        let id = req.params.id;
        let status = await moviesBL.deleteMovie(id);
        return resp.json(status.data);
    })

module.exports = router