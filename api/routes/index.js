var sqlite3 = require("sqlite3");
var express = require("express");
var cors = require("cors");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	var text = "";
	const db = new sqlite3.Database("./data/test_db", sqlite3.OPEN_READWRITE);
	db.serialize(() => {
		db.all(
			"SELECT line_name, budget_amount, real_amount FROM budget_items",
			(err, row) => {
				res.send(row);
			}
		);
	});
});

module.exports = router;
