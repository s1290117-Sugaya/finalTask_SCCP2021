const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.deleteUser = (name, callback) => {
	db.serialize(() => {
		db.run("DELETE FROM users WHERE username = ?;", name, (err) => {
			if(err !== null){
				callback(err)
			}else{
				callback(null)
			}
		})
	})
}
