var express = require('express')
var router = express.Router()
var multer = require('multer')
const { launch } = require("../function");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./uploads");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
});

//Show
router.get("/launch", async function (req, res) {
    const allLaunch = await launch.get({}, "")
    res.render("Launch", { allLaunch })
})
//Update
router.get("/launch/edit/:id", async function (req, res) {
    const { id } = req.params
    launchOne = await launch.get({ _id: id }, '')
    res.render("Launch_Edit", { launch: launchOne[0] })
})
//Create
router.get("/launch/create", async function (req, res) {
    res.render("Launch_Create")
})

router.post("/launch/update/:id", upload.single('logo'), async function (req, res) {
    const { id } = req.params
    const { data } = req.body

    console.log("text", req.file);
    res.send('ok')
})

module.exports = router