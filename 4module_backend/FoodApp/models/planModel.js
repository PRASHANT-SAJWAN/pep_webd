const mongoose = require('mongoose');
mongoose.connect(DB_LINK)
    .then(db => console.log('connected to DB'))
    .catch(err => console.log(err));

const planSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    ratings: {
        type: Number,
        validate: function () {
            return this.ratings <= 5 && this.ratings >= 0;
        }
    },
    price: {
        type: Number,
        validate: function () {
            return this.price >= 0;
        }
    },
    delivery: {
        type: Boolean
    },
    meals: {
        type: String
    },
    description: {
        type: String
    }
});

const planModel = mongoose.model('planModel', planSchema);

module.exports = planModel;