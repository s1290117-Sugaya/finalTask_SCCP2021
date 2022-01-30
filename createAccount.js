const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.newUser = (username, displayName, callback) => {
	db.serialize(() => {
		db.run("INSERT INTO users (username, displayName) VALUES (?, ?);", username, displayName, (err) => {
			if(err !== null){
				callback(err)
			}else{
				callback(null)
			}
		})
	})
}
