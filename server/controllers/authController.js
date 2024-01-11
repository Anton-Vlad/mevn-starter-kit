const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


async function register(req, res) {
    const { username, email, first_name, last_name, password, password_confirm } = req.body

    if (!username || !email || !password || !password_confirm || !first_name || !last_name) {
        return res.status(422).json({message: 'Invalid fields'})
    }

    if (password !== password_confirm) {
        return res.status(422).json({message: 'Passwords do not match'})
    }

    const userExists = await User.findOne({email}).exec()

    if (userExists) {
        return res.status(409).json({message: 'Could not register'})
    }

    try {
        let hashedPassword = await bcrypt.hash(password, 10)

        await User.create({email, username, password: hashedPassword, first_name, last_name})

        return res.sendStatus(201)
    } catch (error) {
        return res.status(400).json({message: "Could not register"})
    }
}
async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({message: 'Invalid credentials'})
    }

    const user = await User.findOne({email}).exec()

    if (!user) {
        return res.status(401).json({message: "Email or password is incorrect"})
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(401).json({message: "Email or password is incorrect"})
    }

    const accessToken = jwt.sign(
        {
            username: user.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1800s'
        }
    )

    const refreshToken = jwt.sign(
        {
            username: user.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d'
        }
    )

    user.refresh_token = refreshToken;
    await user.save()

    res.cookie('refresh_token', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000}) // '1d lifetime'  || sameSite: 'None', secure: true

    res.json({access_token: accessToken})
}
async function logout(req, res) {
    const cookies = req.cookies

    if (!cookies.refresh_token) {
        return res.sendStatus(204)
    }

    const refreshToken = cookies.refresh_token
    const user = await User.findOne({refresh_token: refreshToken}).exec() // exec required in async req

    if (!user) {
        res.clearCookie('refresh_token', {httpOnly: true }) // use cookies between client and server (separate origins) || // sameSite: 'None', secure: true
        return res.sendStatus(204)
    }

    user.refresh_token = null
    await user.save()

    res.clearCookie('refresh_token', {httpOnly: true}) // sameSite: 'None', secure: true // required only in vue requests, Postman throuse error
    res.sendStatus(204)
}
async function refresh(req, res) {
    res.sendStatus(200)
}
async function user(req, res) {
    res.sendStatus(200)
}

module.exports = {register, login, logout, refresh, user}