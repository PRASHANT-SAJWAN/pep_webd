const mongoose = require('mongoose');
const emailValidator = require('email-validator')
let { DB_LINK } = require('../secrets');

mongoose.connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => console.log('connected to DB'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 7,
        validate: function () {
            return this.password === this.confirmPassword;
        }
    },
    createdAt: Date,
    token: String
});

const userModel = mongoose.model('userModel', userSchema);
userSchema.pre('save', function () {
    // confirmPassword kabhi bhi DB m save ni hoga.... DB m save krne se phle undefined krdiya
    this.confirmPassword = undefined;
})

module.exports = userModel;