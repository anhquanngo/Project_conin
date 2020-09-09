var express = require('express')
var router = express.Router()
var multer = require('multer')
const { launch } = require("../function.js");
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

//API
router.get("/launch", async (req, res) => {
    res.json(await launch.get({}, ""))
});

//post 1 launch
router.post("/launch/add", async (req, res) => {
    const newLaunch = req.body
    await launch.create(newLaunch)
    res.json({
        status: "success",
    })
});

//get 1 launch
router.get("/launch/:id", async (req, res) => {
    const { id } = req.params
    launchOne = await launch.get({ _id: id }, '')
    res.json(launchOne)
});

//update 1 launch
router.post("/launch/update/:id", upload.single('logo'), async (req, res) => {
    console.log(req.file);
    const { id } = req.params
    const updateLaunch = req.body
    if (req.body.status == "Buy") {
        updateLaunch.status = true
    } else {
        updateLaunch.status = false
    }
    updateLaunch.logo = req.file.filename

    try {
        await launch.set({ _id: id }, updateLaunch)
        res.redirect('/launch')
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
})

//delete 1 launch
router.delete("/launch/delete/:id", async (req, res) => {
    const { id } = req.params
    await launch.del({ _id: id })
    res.status(200).send({
        status: "success",
        id: id
    })
})


module.exports = router;