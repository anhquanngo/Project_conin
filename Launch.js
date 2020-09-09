
const mongoose = require('mongoose');
const { date } = require('joi');


const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/launch', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, function (err) {
    if (err) {
        console.log("Connect fail");
    } else {
        console.log("Connect success");
    }
})

const schemaLaunch = new Schema({
    symbol: { type: String, default: null },//info b1 form wizard
    logo: { type: String, default: null },//logo
    slogan: { type: String, default: null },//info
    name: { type: String, default: null },//info
    total_supply: { type: Number, default: 0 },//info
    status: { type: Boolean, default: false },// danh cho submit admin
    session: {
        status: { type: Boolean, default: false },
        package: { type: Number, default: 0 },
        supply: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
        min: { type: Number, default: 0 },
        start: { type: Date, default: Date.now },
        end: { type: Date, default: Date.now },
        sell: { type: Number, default: 0 },
        price: { type: Number, default: null },
        bonus: { type: String, default: null },
    },//session
    link: {
        website: { type: String, default: null },
        telegram: { type: String, default: null },
        twitter: { type: String, default: null }
    },//info
    // listing: {type: Date, default: null},
    intro: [{ type: String, default: null }],//introduction
    note: [{ type: String, default: null }],//note
    whiteList: [
        {
            id: { type: String, default: null },
            amount: { type: Number, default: 0 }
        }
    ],
}, {
    timestamps: true,
    versionKey: false
})

const Launch = mongoose.model('Launch', schemaLaunch, 'launchs')

module.exports = Launch