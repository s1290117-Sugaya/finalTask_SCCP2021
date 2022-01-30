const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.deleteTweet = (id, callback) => {
	db.serialize(() => {
		db.run("DELETE FROM tweets WHERE id = ?;", id, (err) => {
			if(err !== null){
				callback(err)
			}else{
				callback(null)
			}
		})
	})
}
