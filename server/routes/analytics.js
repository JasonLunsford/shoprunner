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
				"tradeName":  "Fancy Pants",
				"lookupName": "fancypants",
				"counter": {
					"exp1": 0,
					"exp2": 0
				},
				"experiences": [
					{
						"lookupName": "exp1",
						"name":       "Muted Gold",
						"background": "#f4f4f4",
						"details":    "#dcd0c0",
						"foreground": "#c0b283",
						"text":       "#373737"
					},
					{
						"lookupName": "exp2",
						"name":       "Minimal Dusty",
						"background": "#d5d5d5",
						"details":    "#96858f",
						"foreground": "#6d7993",
						"text":       "#373737"
					}
				]
			},
			{
				"tradeName":  "Sweet Soul",
				"lookupName": "sweetsoul",
				"counter": {
					"exp1": 0,
					"exp2": 0
				},
				"experiences": [
					{
						"lookupName": "exp1",
						"name":       "Warm Sky",
						"background": "#efefef",
						"details":    "#caebf2",
						"foreground": "#c0b283",
						"text":       "#a9a9a9"
					},
					{
						"lookupName": "exp2",
						"name":       "Pretty Peach",
						"background": "#fedcd2",
						"details":    "#df744a",
						"foreground": "#8fd8d2",
						"text":       "#233237"
					}
				]
			}
		]);

		db.push("/users", [
			{
				"firstName":    "george",
				"lastName":     "washington",
				"username":     "patriot",
				"birthday":     "-7506086400000",
				"favColor":     "darkgreen",
				"preferredExp": {
					"fancypants": {
						"exp1": 0,
						"exp2": 0
					},
					"sweetsoul": {
						"exp1": 0,
						"exp2": 0
					}
				}
			},
			{
				"firstName":    "aanjan",
				"lastName":     "ravi",
				"username":     "wrex",
				"birthday":     "484790400000",
				"favColor":     "darkmagenta",
				"preferredExp": {
					"fancypants": {
						"exp1": 0,
						"exp2": 0
					},
					"sweetsoul": {
						"exp1": 0,
						"exp2": 0
					}
				}
			},
			{
				"firstName":    "becky",
				"lastName":     "stout",
				"username":     "beerlover",
				"birthday":     "655084800000",
				"favColor":     "darkorange",
				"preferredExp": {
					"fancypants": {
						"exp1": 0,
						"exp2": 0
					},
					"sweetsoul": {
						"exp1": 0,
						"exp2": 0
					}
				}
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
	const payload = JSON.parse(req.body.payload);

	const users = db.getData('/users');
	const isValid = _.find(users, user => user.firstName === userId);

	if (userId === null || !isValid) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} else {
		let updatedUsers = _.filter(users, user => user.firstName !== userId);
		updatedUsers = [...updatedUsers, payload];

		db.push('/users', updatedUsers, true);

		res.status(200).send({status: 200});
	}
});

router.post('/shops/:id', async (req, res) => {
	const shopId = req.params.id;
	const payload = JSON.parse(req.body.payload);

	const shops = db.getData('/shops');
	const isValid = _.find(shops, shop => shop.lookupName === shopId);

	if (shopId === null || !isValid) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} else {
		let updatedShops = _.filter(shops, shop => shop.lookupName !== shopId);
		updatedShops = [...updatedShops, payload];

		db.push('/shops', updatedShops, true);

		res.status(200).send({status: 200});
	}
});

module.exports = router;
