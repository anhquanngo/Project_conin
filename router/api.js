var express = require('express')
var router = express.Router()
var multer = require('multer')
const fs = require("fs");
const path = require("path");
const { deleteLaunch, getOne, updateOne, addOne, apiAll } = require('../controller/launch.js');
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
router.get("/launch", apiAll);

//post 1 launch
router.post("/launch/add", upload.single('logo'), addOne);

//get 1 launch
router.get("/launch/:id", getOne);

//update 1 launch
router.post("/launch/update/:id", upload.single('logo'), updateOne)

//delete 1 launch
router.delete("/launch/delete/:id", deleteLaunch)


module.exports = router;