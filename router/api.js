var express = require('express')
var router = express.Router()
const { launch } = require("../function.js");

//API
router.get("/launch", async (req, res) => {
    res.json(await launch.get({}, ""))
});

//post 1 launch
router.post("/launch/add", async (req, res) => {
    const newLaunch = req.body
    console.log("newLaunch", newLaunch)
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
router.put("/launch/update/:id", async (req, res) => {
    const { id } = req.params
    const updateLaunch = req.body
    const currentLaunch = await launch.findOne({ _id: id }, '')
    const returnedTarget = Object.assign(currentLaunch, updateLaunch);

    await launch.set({ _id: id }, returnedTarget)
    res.json({
        status: "success",
    })
})

//delete 1 launch
router.delete("/launch/delete/:id", async (req, res) => {
    const { id } = req.params
    await launch.del({ _id: id })
    res.json({
        status: "success"
    })
})


module.exports = router;