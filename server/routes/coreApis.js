const express = require('express');
const router = express.Router();
const JsonDB = require('node-json-db');
const _ = require('lodash');

// Prepare database
let db = new JsonDB("shopRunnerDb", true, true);

// JSON Database initalizer
router.get('/', async (req, res) => {
	const prep = req.query.prep;

	if (prep === 'true') {
		db.push("/shops", [
			{
				"tradeName": "Fancy Pants",
				"lookupName": "fancypants",
				"brandColor1": "#222",
				"brandColor2": "#ff8c00"
			},
			{
				"tradeName": "Sweet Soul",
				"lookupName": "sweetsoul",
				"brandColor1": "#8b008b",
				"brandColor2": "#fff"
			}
		]);

		db.push("/users", [
			{
				"firstName": "george",
				"lastName": "washington",
				"username": "patriot",
				"password": "z00m",
				"birthday": "-7506086400000",
				"favColor0": "green",
				"favColor1": "yellow",
				"favColor2": "darkred"
			},
			{
				"firstName": "aanjan",
				"lastName": "ravi",
				"username": "wrex",
				"password": "supermansux",
				"birthday": "484790400000",
				"favColor0": "blue",
				"favColor1": "pink",
				"favColor2": "purple"
			},
			{
				"firstName": "becky",
				"lastName": "stout",
				"username": "beerlover",
				"password": "victory!",
				"birthday": "655084800000",
				"favColor0": "orange",
				"favColor1": "brown",
				"favColor2": "darkgreen"
			}
		]);

		res.status(200).send({status: 200, msg: 'Database Initalized'});
	} else {
		res.status(404).send({status: 404, msg: 'Incomplete Request'});
	}

});

router.get('/users/:id', async (req, res) => {
	const userId = req.params.id;
	const users = db.getData('/users');

	if (userId === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	if (userId === 'all') {
		res.send({users});
	} else {
		const user = users.filter(u => u.firstName === userId);

		res.send({user});
	}
});

router.get('/shops/:id', async (req, res) => {
	const shopId = req.params.id;
	const shops = db.getData('/shops');

	if (shopId === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	if (shopId === 'all') {
		res.send({shops});
	} else {
		const shop = shops.filter(s => s.lookupName === shopId);

		res.send({shop});
	}
});

router.post('/users/:id', async (req, res) => {
	const userId = req.params.id;
	const users = db.getData('/users');
	const payload = JSON.parse(req.body.payload);

	let user = users.filter(u => u.firstName === userId);

	if (userId === null || user.length === 0) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	_.filter(users, user => {
		if (user.firstName === userId) {
			_.assign({}, user, payload);
		}
	});

	db.push('/users', users);
});

module.exports = router;
