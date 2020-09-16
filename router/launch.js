var express = require('express')
var router = express.Router()
var multer = require('multer')
const { launch } = require("../Launch/function");
const { search } = require('../controller/launch.js');
const mongoose = require("mongoose");
const Launch = mongoose.model("Launch");
const User = mongoose.model("User");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./uploads");
        },
        limits: function (req, file, cb) {
            file.fieldSize
            console.log("fieldSize", fieldSize)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
});

//Show Launch
router.get("/launch", async function (req, res) {
    const page = parseInt(req.query.page || 1)
    const limit = 6
    const skip = (page - 1) * limit;
    const totalDocuments = await Launch.find().countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);
    const range = []
    const rangerForDot = [];
    const detal = 1;
    const left = page - detal;
    const right = page + detal;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i <= right)) {
            range.push(i);
        }
    }
    let temp;

    range.map((i) => {
        if (temp) {
            if (i - temp === 2) {
                rangerForDot.push(i - 1);
            } else if (i - temp !== 1) {
                rangerForDot.push("...");
            }
        }
        temp = i;
        rangerForDot.push(i);
    });

    const allLaunch = await Launch.find()
        .limit(limit)
        .skip(skip);


    // const allLaunch = await launch.get({}, "")
    res.render("Launch", {
        allLaunch,
        range: rangerForDot,
        page,
        totalPages
    })
})
//Update Launch
router.get("/launch/edit/:id", async function (req, res) {
    const { id } = req.params
    launchOne = await launch.get({ _id: id }, '')
    res.render("Launch_Edit", { launch: launchOne[0] })
})
//Create 
router.get("/launch/create", async function (req, res) {
    res.render("Launch_Create")
})
router.get("/404", async function (req, res) {
    res.render("errors/error-404")
})
router.get("/500", async function (req, res) {
    res.render("errors/error-500")
})
router.get("/403", async function (req, res) {
    res.render("errors/error-403")
})
router.get("/400", async function (req, res) {
    res.render("errors/error-400")
})
router.get("/505", async function (req, res) {
    res.render("errors/error-503")
})

// Show User
router.get("/user", async function (req, res) {
    const page = parseInt(req.query.page || 1)
    const limit = 13
    const skip = (page - 1) * limit;
    const totalDocuments = await User.find().countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);
    const range = []
    const rangerForDot = [];
    const detal = 1;
    const left = page - detal;
    const right = page + detal;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i <= right)) {
            range.push(i);
        }
    }
    let temp;

    range.map((i) => {
        if (temp) {
            if (i - temp === 2) {
                rangerForDot.push(i - 1);
            } else if (i - temp !== 1) {
                rangerForDot.push("...");
            }
        }
        temp = i;
        rangerForDot.push(i);
    });

    const allUser = await User.find()
        .limit(limit)
        .skip(skip);


    res.render("User", {
        allUser,
        range: rangerForDot,
        page,
        totalPages
    })
})

router.get("/search", search);



module.exports = router