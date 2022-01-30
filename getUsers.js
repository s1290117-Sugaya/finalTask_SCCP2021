const express = require("express")
const sqlite3 = require("sqlite3")

const app = express()
app.use(express.json())

const db = new sqlite3.Database("./twitter.db")

exports.showUsers = (callback) => {
	db.serialize(() => {
		db.all("SELECT * FROM users;", (err, rows) => {
			if(err !== null){
				callback(err, undefined)
			}else{
				const users = rows.map(row => {
					return{
						id: row.id,
						username: row.username, 
						displayName: row.displayName
					}
				})
				callback(null, users)
			}
		})
	})
}
