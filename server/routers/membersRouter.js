const express = require('express')
const membersBL = require('../models/members/membersBL');
const router = express.Router();

router.route('/')
    .get(async function (req, resp) {
        let data = await membersBL.getAllMembers();
        return resp.json(data);
    })

router.route('/')
    .get(async function (req, resp) {
        let data = await membersBL.getAllMembers();
        return resp.json(data);
    })

router.route('/:id')
    .get(async function (req, resp) {
        let id = req.params.id;
        let data = await membersBL.getMember(id);
        return resp.json(data);
    })

router.route('/')
    .post(async function (req, resp) {
        let obj = req.body;
        let status = await membersBL.addMember(obj);
        return resp.json(status);
    })

router.route('/:id')
    .put(async function (req, resp) {
        let obj = req.body;
        let id = req.params.id;
        let status = await membersBL.updateMember(id, obj);
        return resp.json(status.data);
    })

router.route('/:id')
    .delete(async function (req, resp) {
        let id = req.params.id;
        let status = await membersBL.deleteMember(id);
        return resp.json(status.data);
    })

module.exports = router