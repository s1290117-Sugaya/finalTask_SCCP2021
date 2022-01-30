const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.showTweets = (callback) => {
	db.serialize(() => {
		db.all("SELECT * FROM users JOIN tweets ON tweets.userId == users.id;", (err, rows) => {
			if(err !== null){
				callback(err, undefined)
			}else{
				const tweets = rows.map(row => {
					return{
						id: row.id,
						username: row.username,
						displayName: row.displayName,
						content: row.content
					}
				})
				callback(null, tweets)
			}
		})
	})
}
