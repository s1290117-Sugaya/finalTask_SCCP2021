DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS passwords;

CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username CHAR(16) UNIQUE NOT NULL,
	displayName CHAR(51) NOT NULL
);

CREATE TABLE tweets(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	userId INTEGER NOT NULL,
	content CHAR(281) NOT NULL,
	FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE passwords(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username CHAR(16) UNIQUE NOT NULL,
	password CHAR(51) NOT NULL,
	FOREIGN KEY (username) REFERENCES users(username)
);