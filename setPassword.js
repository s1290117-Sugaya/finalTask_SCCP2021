const express = require("express")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.setPass = (username, password, callback) => {
	db.serialize(() => {
		let hashed = bcrypt.hashSync(password, 10)
		db.run("INSERT INTO passwords (username, password) VALUES (?, ?);", username, hashed, (err) => {
			if(err !== null){
				callback(err)
			}else{
				callback(null)
			}
		})
	})
}
