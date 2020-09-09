const express = require("express");
const { Router } = require("express");
var path = require('path');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
const Joi = require("joi")

const apiRouter = require("./router/api")
const launchRouter = require("./router/launch");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, '/uploads')));
//public file img
app.use("/api", apiRouter)
app.use("/", launchRouter)

app.get("/", function (req, res) {
  res.render("Dashboard")
})

//update
// router
//   .route("/launch/edit/:id")
//   .get("/launch/edit/:id", async function (req, res) {
//     const { id } = req.params
//     launchOne = await launch.get({ _id: id }, '')
//     res.render("Launch_Edit", launchOne)
//   })
//   .post(async function (req, res) {
//     const { id } = req.params
//     const file = req.file;

//     if (file) {
//       const pathUpload = path.resolve("src", "public", "images", "products");

//       const contentFile = fs.readFileSync(file.path);
//       fs.unlinkSync(file.path);
//       fs.writeFileSync(path.join(pathUpload, file.originalname), contentFile);
//     }

//     const bodySchema = Joi.object({
//       symbol: Joi.string().required(),
//       slogan: Joi.string(),
//       name: Joi.string(),
//       total_supply: Joi.number(),
//       intro: Joi.array().items(),
//       note: Joi.array().items(),
//       section: Joi.object({
//         status: Joi.boolean(),
//         package: Joi.number(),
//         supply: Joi.number(),
//         max: Joi.number(),
//         min: Joi.number(),
//         start: Joi.Date(),
//         end: Joi.Date(),
//         sell: Joi.number(),
//         price: Joi.number(),
//         bonus: Joi.number(),
//       })
//     }).unknown();

//     const value = await bodySchema.validateAsync(req.body).catch((err) => err);
//     if (value instanceof Error) {
//       return res.redirect(req.path);
//     }

//     const launchUpdate = {
//       symbol: value.symbol,
//       slogan: value.slogan,
//       name: value.name,
//       total_supply: value.total_supply,
//       status: value.status,
//       intro: [],
//       note: [],
//       whiteList: [],
//       link: {
//         website: value.website,
//         telegram: value.telegram,
//         twitter: value.twitter
//       },
//       section: {
//         status: value.status,
//         package: value.package,
//         supply: value.supply,
//         max: value.max,
//         min: value.min,
//         start: value.start,
//         end: value.end,
//       }
//     }

//     if (file) {
//       productUpdate["prd_image"] = file.originalname;
//     }

//     launchOne = await launch.set({ _id: id }, launchUpdate)
//     return res.redirect("/launch");
//   })


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
