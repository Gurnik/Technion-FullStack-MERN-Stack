const express = require('express')
const subscribtionsBL = require('../models/subscribtions/subscribtionsBL');
const router = express.Router();

router.route('/')
    .get(async function (req, resp) {
        let data = await subscribtionsBL.getAllSubscribtions();
        return resp.json(data);
    })

router.route('/')
    .post(async function (req, resp) {
        let obj = req.body;
        let status = await subscribtionsBL.addSubscribtion(obj);
        return resp.json(status);
    })

router.route('/:id')
    .delete(async function (req, resp) {
        let id = req.params.id;
        let status = await subscribtionsBL.deleteSubscribtion(id);
        return resp.json(status.data);
    })

module.exports = router