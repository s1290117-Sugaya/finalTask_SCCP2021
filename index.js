const express = require("express")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())
const db = new sqlite3.Database("./twitter.db")

const createAccount = require("./createAccount.js")
const composeTweet = require("./composeTweet.js")
const getUsers = require("./getUsers.js")
const getTweets = require("./getTweets.js")
const getUser = require("./getUser.js")
const getTweet = require("./getTweet.js")
const dropUser = require("./dropUser.js")
const dropTweet = require("./dropTweet.js")
const setPassword = require("./setPassword.js")
const confirmPassword = require("./confirmPassword.js")
const deletePassword = require("./deletePassword.js")

const newUser = createAccount.newUser
const newTweet = composeTweet.newTweet
const showUsers = getUsers.showUsers
const showTweets = getTweets.showTweets
const showUser = getUser.showUser
const showTweet = getTweet.showTweet
const deleteUser = dropUser.deleteUser
const deleteTweet = dropTweet.deleteTweet
const setPass = setPassword.setPass
const login = confirmPassword.login
const deletePass = deletePassword.deletePass

var current = undefined

app.get("/current", (req, res) =>{
	res.json({current: current})
})

app.post("/users", (req, res) => {
	const data = req.body
	showUser(data.username, (err, user) => {
		if(err !== null){
			console.log(err)
			res.statusCode = 500
			res.json(err)
		}else if(user == undefined){
			newUser(data.username, data.displayName, (err) => {
				if(err !== null){
					console.log(err)
					res.statusCode = 500
					res.json(err)
				}else{
					setPass(data.username, data.password, (err) => {
						if(err !== null){
							console.log(err)
							res.statusCode = 500
							res.json(err)
						}else{
							current = data.username
							res.statusCode = 200
							res.end()
						}
					})
				}
			})
		}else{
			console.log(err)
			res.statusCode = 409
			res.json(err)
		}
	})
})

app.get("/passwords", (req, res) => {
	const username = req.query["name"]
	const password = req.query["pass"]
	login(username, password, (err, user) => {
		if(err !== null){
			console.log(err)
			res.statusCode = 500
			res.json(err)
		}else if(user == undefined){
			res.statusCode = 404
			res.end()
		}else{
			current = username
			res.statusCode = 200
			res.end()
		}
	})
})

app.get("/users", (req, res) =>{
	showUsers((err, users) => {
		if(err !== null){
			console.log(err)
			res.statusCode = 500
			res.json(err)
		}else{
			res.statusCode = 200
			res.json(users)
		}
	})
})

app.get("/users/:username", (req, res) => {
        const name = req.params["username"]
        showUser(name, (err, user) => {
                if(err !== null){
                        console.log(err)
                        res.statusCode = 500
                        res.json(err)
                }else if(user == undefined){
                        res.statusCode = 404
                        res.end()
                }else{
			res.statusCode = 200
                        res.json(user)
                }
        })
})

app.delete("/users/:username", (req, res) => {
	const name = req.params["username"]
	showUser(name, (err, user) => {
		if(err !== null){
			console.log(err)
			res.statusCode = 500
			res.json(err)
		}else if(user == undefined){
			res.statusCode = 404
			res.end()
		}else{
			deleteUser(name, (err) => {
				if(err !== null){
					console.log(err)
					res.statusCode = 500
					res.json(err)
				}else{
					deletePass(name, (err) => {
						if(err !== null){
							console.log(err)
							res.statusCode = 500
							res.json(err)
						}else{
							res.statusCode = 200
							res.end()
						}
					})
				}
			})
		}
	})
})

app.post("/tweets", (req, res) => {
	const tweet = req.body
	newTweet(tweet.userId, tweet.content, (err) => {
		if(err !== null){
			console.log(err)
			res.statusCode = 500
			res.json(err)
		}else{
			res.statusCode = 200
			res.end()
		}
	})
})

app.get("/tweets", (req, res) => {
	showTweets((err, tweets) => {
		if(err !== null){
			console.log(err)
			res.statusCode = 500
			res.json(err)
		}else{
			res.statusCode = 200
			res.json(tweets)
		}
	})
})

app.get("/tweets/:id", (req, res) => {
        const id = Number(req.params["id"])
        showTweet(id, (err, tweet) => {
                if(err !== null){
                        console.log(err)
                        res.statusCode = 500
                        res.json(err)
                }else if(tweet == undefined){
                        res.statusCode = 404
                        res.end()
                }else{
			res.statusCode = 200
                        res.json(tweet)
                }
        })
})

app.delete("/tweets/:id", (req, res) => {
	const id = Number(req.params["id"])
	showTweet(id, (err, tweet) => {
		if(err !== null){
			console.log(err)
			res.statusCode = 500
			res.json(err)
		}else if(tweet == undefined){
			res.statusCode = 404
			res.end()
		}else{
			deleteTweet(id, (err) => {
				if(err !== null){
					console.log(err)
					res.statusCode = 500
					res.json(err)
				}else{
					res.statusCode = 200
					res.end()
				}
			})
		}
	})
})

app.use("/page", express.static(__dirname + "/public"))

app.listen(3000, (err) => {
	console.log("server start")
})
