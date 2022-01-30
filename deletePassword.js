const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.deletePass = (username, callback) => {
	db.serialize(() => {
		db.run("DELETE FROM passwords WHERE username = ?;", username, (err) => {
			if(err !== null){
				callback(err)
			}else{
				callback(null)
			}
		})
	})
}
