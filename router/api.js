var express = require('express')
var router = express.Router()
var multer = require('multer')
const fs = require("fs");
const path = require("path");
const { launch } = require("../function.js");
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./uploads");
        },
        filename: function (req, file, cb) {
            const imagePath = path.join(__dirname, '../uploads');
            try {
                let files = fs.readdirSync(imagePath);
                files.forEach((f, i) => {
                    if (f.toString().startsWith(req.body.symbol.toString())) {
                        console.log(f.toString());
                        fs.unlinkSync(imagePath + "/" + f)
                    }
                })
            } catch (error) {
                console.log(error);
            }
            cb(null, req.body.symbol + "-" + file.originalname);
        },
    }),
});

//API
router.get("/launch", async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    try {
        const launches = await launch.get({}, "")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        // get total documents in the Posts collection 
        const count = await launch.countDocuments();

        // return response with posts, total pages, and current page
        res.json({
            launches,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });

    } catch (error) {
        console.log(error);
    }

    // res.json(await launch.get({}, ""))
});

//post 1 launch
router.post("/launch/add", upload.single('logo'), async (req, res) => {
    const newLaunch = req.body
    newLaunch.logo = req.file.filename
    if (req.body.status == "Buy") {
        newLaunch.status = true
    } else {
        newLaunch.status = false
    }
    if (req.body.statusS == "Buy") {
        newLaunch.statusS = true
    } else {
        newLaunch.statusS = false
    }

    let toSave = {
        symbol: newLaunch.symbol.toString().trim(),
        logo: newLaunch.logo,
        slogan: newLaunch.slogan,
        name: newLaunch.name,
        total_supply: newLaunch.total_supply,
        status: newLaunch.status,
        session: {
            statusS: newLaunch.statusS,
            package: newLaunch.package,
            supply: newLaunch.supply,
            max: newLaunch.max,
            min: newLaunch.min,
            sell: newLaunch.sell,
            price: newLaunch.price,
            start: new Date(newLaunch.start),
            end: new Date(newLaunch.end),
            bonus: newLaunch.bonus,
        },
        link: {
            website: newLaunch.website,
            telegram: newLaunch.telegram,
            twitter: newLaunch.twitter,
        },
        intro: newLaunch.intro,
        note: newLaunch.note,
    }

    try {
        await launch.create(toSave)
        res.redirect('/launch')
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "fail",
        })
        res.redirect('back')
    }
});

//get 1 launch
router.get("/launch/:id", async (req, res) => {
    const { id } = req.params
    launchOne = await launch.get({ _id: id }, '')
    res.json(launchOne)
});

//update 1 launch
router.post("/launch/update/:id", upload.single('logo'), async (req, res) => {
    const { id } = req.params
    const updateLaunch = req.body
    const file = req.file

    if (updateLaunch.status == "Buy") {
        updateLaunch.status = true
    }
    if (updateLaunch.status == "Sell") {
        updateLaunch.status = false
    }
    if (updateLaunch.statusS == "Buy") {
        updateLaunch.statusS = true
    }
    if (updateLaunch.statusS == "Sell") {
        updateLaunch.statusS = false
    }

    if (file) {
        updateLaunch.logo = file.filename
    }

    let toSave = {
        symbol: updateLaunch.symbol.toString().trim(),
        logo: updateLaunch.logo,
        slogan: updateLaunch.slogan,
        name: updateLaunch.name,
        total_supply: updateLaunch.total_supply,
        status: updateLaunch.status,
        session: {
            statusS: updateLaunch.statusS,
            package: updateLaunch.package,
            supply: updateLaunch.supply,
            max: updateLaunch.max,
            min: updateLaunch.min,
            sell: updateLaunch.sell,
            price: updateLaunch.price,
            start: new Date(updateLaunch.start),
            end: new Date(updateLaunch.end),
            bonus: updateLaunch.bonus,
        },
        link: {
            website: updateLaunch.website,
            telegram: updateLaunch.telegram,
            twitter: updateLaunch.twitter,
        },
        intro: updateLaunch.intro,
        note: updateLaunch.note,
    }

    try {
        await launch.set({ _id: id }, toSave)
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