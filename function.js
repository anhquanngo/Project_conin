
const DB = require('./DB.js');
const db = new DB()
class Launch {
    async create(first) {
        const res = await db.launch(first)
        return res
    }

    async get(filter, matches) {
        const res = await db.launch(filter, matches)
        if (res[0] !== undefined) {
            return res
        } else {
            return false
        }
    }
    async set(filter, updater) {
        const res = await db.launch(filter, updater)
        return res
    }
    async del(filter) {
        const res = await db.Launch.deleteOne(filter)
        return
    }
    async findOne(filter) {
        const res = await db.Launch.findById(filter)
        return res
    }

}

var launch = new Launch();

// var faker = require('faker');

// const createDL = () => {
//     var symbolRandom = faker.finance.currencyCode()
//     var logoRandom = faker.image.imageUrl()
//     var sloganRandom = faker.company.bs();
//     var nameRandom = faker.company.companyName()
//     var total_supplyRandom = faker.finance.creditCardCVV()
//     var statusR = faker.random.boolean()
//     var statusS = faker.random.boolean()
//     var packageS = Math.floor(Math.random() * 101)
//     var supplyS = Math.floor(Math.random() * 101)
//     var maxS = Math.floor(Math.random() * 101)
//     var minS = Math.floor(Math.random() * 101)
//     var startS = faker.date.past()
//     var endS = faker.date.future()
//     var sellS = faker.commerce.price()
//     var priceS = faker.commerce.price()
//     var websiteR = faker.internet.url()
//     var telegramR = faker.internet.url()
//     var twitterR = faker.internet.url()
//     launch.create({
//         symbol: symbolRandom,
//         logo: logoRandom,
//         slogan: sloganRandom,
//         name: nameRandom,
//         total_supply: total_supplyRandom,
//         status: statusR,
//         session: {
//             statusS: statusS,
//             package: packageS,
//             supply: supplyS,
//             max: maxS,
//             min: minS,
//             start: startS,
//             end: endS,
//             sell: sellS,
//             price: priceS,
//             bonus: 0
//         },
//         link: {
//             website: websiteR,
//             telegram: telegramR,
//             twitter: twitterR
//         },
//         intro: [],
//         note: [],
//         whiteList: []
//     })
//     console.log("createDL -> launch", launch)
// }
// for (let index = 0; index < 9; index++) {
//     createDL()
// }


module.exports = {
    launch: launch,
};
