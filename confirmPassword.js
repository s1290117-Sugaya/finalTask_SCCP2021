const express = require("express")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.login = (name, password, callback) => {
	db.serialize(() => {
		db.get("SELECT * FROM passwords WHERE username = ?;", name, (err, row) => {
			if(err !== null){
				callback(err, undefined)
			}else if(row == undefined){
				callback(null, undefined)
			}else{
				const user = {
					id: row.id,
					username: row.username,
					password: row.password
				}
				if(bcrypt.compareSync(password, user.password) == 1){
					callback(null, user)
				}else{
					callback(null, undefined)
				}
			}
		})
	})
}
