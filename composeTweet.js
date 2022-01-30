const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.newTweet = (userId, content, callback) => {
	db.serialize(() => {
		db.run("INSERT INTO tweets (userId, content) VALUES (?, ?);", userId, content, (err) => {
			if(err !== null){
				callback(err)
			}else{
				callback(null)
			}
		})
	})
}
