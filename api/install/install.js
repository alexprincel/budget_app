var sqlite3 = require("sqlite3");

const db = new sqlite3.Database("../data/test_db");

db.serialize(() => {
	db.run(
		"CREATE TABLE budget_items (line_name TEXT, budget_amount REAL, real_amount REAL)"
	);
	db.run("INSERT INTO budget_items VALUES ('test', 123, 456)");
});

db.close();
