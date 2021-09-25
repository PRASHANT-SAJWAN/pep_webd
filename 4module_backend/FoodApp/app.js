// npm init -y
// npm i express
// npm i nodemon -g 
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json()); // to accept post requests

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

userRouter.route('/')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route('/:id')
    .get(getUserById);

authRouter
    .post("/signup", setCreatedAt, signupUser)
    .post("/login", loginUser);
// database 

const userModel = require('./models/userModel');

function setCreatedAt(req, res, next) {
    let body = req.body;
    let length = Object.keys(body).length;
    if (length == 0) {
        return res.status(400).json({
            message: "can't create user when body i empty "
        })
    }
    req.body.createdAt = new Date().toISOString();
    next();
}

async function signupUser(req, res) {
    // email, user name, password
    try {
        let userObj = req.body;
        console.log("user", req.body);
        let user = await userModel.create(userObj);   // put in database
        console.log(user);

        res.status(200).json({
            message: "user created",
            createdUser: req.body
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

function createUser(req, res) {
    console.log("req.data", req.body);
    user = req.body;
    res.status(200).send("data recieved and user added ");
}

async function getUser(req, res) {
    try {
        let users = await userModel.find();
        res.status(200).json({
            'message': 'list of all the users',
            users: users
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            "message": "can't get users"
        })
    }
}

async function updateUser(req, res) {
    try {
        let userObj = req.body;
        let user = await userModel.updateOne(id, userObj);   // put in database
        console.log(user);

        res.status(200).json({
            message: "user updated",
            createdUser: user
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            "message": "can't update users"
        })
    }
}

async function deleteUser(req, res) {
    try {
        let id = req.body.id;
        await userModel.deleteOne (id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            "message": "can't delete users"
        })
    }
}

async function getUserById(req, res) {
    try {
        let userObj = req.body;
        let users = await userModel.findById({name: userObj.name});
        res.status(200).json({
            'message': 'list of all the users',
            users: users
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            "message": "can't get users by ID"
        })
    }
}

async function loginUser(req, res) {

}

app.listen(8080, () => {
    console.log('server started at 8080');
});