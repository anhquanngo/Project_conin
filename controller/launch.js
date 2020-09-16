const { launch } = require("../Launch/function.js");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Launch = mongoose.model("Launch");

//delete
module.exports.deleteLaunch = async function (req, res) {
    const { id } = req.params
    await launch.del({ _id: id })
    res.status(200).send({
        status: "success",
        id: id
    })
}
// update 1
module.exports.updateOne = async (req, res) => {
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
}
//add 1
module.exports.addOne = async (req, res) => {
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
        total_supply: parseFloat(newLaunch.total_supply),
        status: newLaunch.status,
        session: {
            statusS: newLaunch.statusS,
            package: parseFloat(newLaunch.package),
            supply: parseFloat(newLaunch.supply),
            max: parseFloat(newLaunch.max),
            min: parseFloat(newLaunch.min),
            sell: parseFloat(newLaunch.sell),
            price: parseFloat(newLaunch.price),
            start: new Date(newLaunch.start),
            end: new Date(newLaunch.end),
            bonus: parseFloat(newLaunch.bonus),
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
}
//API show all
module.exports.apiAll = async (req, res) => {
    const { page = 1, limit = 2 } = req.query;
    try {
        const launches = await Launch.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        // get total documents in the Posts collection 
        const count = await Launch.countDocuments();

        // return response with posts, total pages, and current page
        res.json({
            launches,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });

    } catch (error) {
        console.log(error);
    }
}
//get 1
module.exports.getOne = async (req, res) => {
    const { id } = req.params
    launchOne = await launch.get({ _id: id }, '')
    res.json(launchOne)
}

exports.search = async function (req, res, next) {
    try {
        const { q = "" } = req.query;
        const page = parseInt(req.query.page || 1)
        const limit = 13
        const skip = (page - 1) * limit;
        const totalDocuments = await User.find({
            $text: {
                $search: q,
            },
        }).countDocuments();
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

        const allUser = await User.find({
            $text: {
                $search: q,
            },
        }).limit(limit).skip(skip);

        return res.render("search", {
            allUser,
            range: rangerForDot,
            page,
            totalPages,
            q
        });
    } catch (error) {
        next(error);
    }
};