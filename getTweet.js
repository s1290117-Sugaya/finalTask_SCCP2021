const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.showTweet = (id, callback) => {
	db.serialize(() => {
		db.get("SELECT * FROM users JOIN tweets ON tweets.userId == users.id WHERE tweets.id = ?;", id, (err, row) => {
			if(err !== null){
				callback(err, undefined)
			}else if(row == undefined){
				callback(null, undefined)
			}else{
				const tweet = {
					id: row.id,
					username: row.username,
					displayName: row.displayName,
					content: row.content
				}
				callback(null, tweet)
			}
		})
	})
}
