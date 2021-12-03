const express = require('express')
const usersBL = require('../models/users/usersBL');
const router = express.Router();

router.route('/')
    .post(async function (req, resp) {
        try {
            const username = req.body.username;
            const password = req.body.password;
    
            let data = await usersBL.getUser(username, password);
            return resp.status(200).json(data);
        } catch(err) {
            return resp.status(400).json(err);
        }
    })

module.exports = router