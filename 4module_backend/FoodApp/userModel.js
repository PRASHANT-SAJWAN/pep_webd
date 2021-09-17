const mongoose = require('mongoose');
const emailValidator = require('email-validator')
let { DB_LINK } = require('./secrets');

mongoose.connect(DB_LINK)
    .then(db => console.log('connected to DB'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: function () {
            return emailValidator.validate (this.email);
        }
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate: function() {}
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 7,
        validate: function() {
            return this.password === this.confirmPassword;
        }
    }
});

const userModel = mongoose.model ('userModel', userSchema);

(async function createUser () {
    let userObj = {
        name: 'name',
        age: 10,
        email: 'abcd@gmail.com',
        password: '123456789',
        confirmPassword: '123456789'
    }
    let user = await userModel.create(userObj);
    console.log(user);
})();