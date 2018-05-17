const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req, res) => {
    const payload = JSON.parse(req.body.payload);

    // res.redirect('https://domain0.auth.com');

    // grab login data off payload & validate input

    // redirect to SSO server / authentication domain, handle reply from SSO server

    // consider session pinning when scaling aggressively, and avoid state / control state carefully
});

module.exports = router;
