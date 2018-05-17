const express = require('express');
const router = express.Router();
const JsonDB = require('node-json-db');
const _ = require('lodash');

// Prepare database
let db = new JsonDB("shopRunnerRegDb", true, true);

router.post('/', async (req, res) => {
    const payload = JSON.parse(req.body.payload);

    // grab form data off payload, validate, push into Db immediately (no state)

    // good idea to use a Mongoose schema if using MongoDb

    // reply with 200 or 401, do not give away useful clues
});

module.exports = router;
