const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.showUser = (name, callback) => {
	db.serialize(() => {
		db.get("SELECT * FROM users WHERE username = ?;", name, (err, row) => {
			if(err !== null){
				callback(err, undefined)
			}else if(row == undefined){
				callback(null, undefined)
			}else{
				const user = {
					id: row.id,
					username: row.username,
					displayName: row.displayName
				}
				callback(null, user)
			}
		})
	})
}
