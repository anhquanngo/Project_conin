
const DB = require('./DB.js');
const db = new DB()
class User {
    async create(first) {
        const res = await db.user(first)
        return res
    }

    async get(filter, matches) {
        const res = await db.user(filter, matches)
        if (res[0] !== undefined) {
            return res
        } else {
            return false
        }
    }
    async set(filter, updater) {
        const res = await db.user(filter, updater)
        return res
    }
    async del(filter) {
        const res = await db.User.deleteOne(filter)
        return
    }
    async findOne(filter) {
        const res = await db.User.findById(filter)
        return res
    }

}

var user = new User();

var faker = require('faker');

// const fakerData = async () => {
//     for (i = 0; i < 100; i++) {
//         var randomID = faker.random.number();
//         var randomHash_pass = faker.internet.password();
//         var randomSymbol = faker.finance.currencySymbol();
//         var randomAddress = faker.address.streetAddress();
//         var randomMail = faker.internet.email();
//         var randomfName = faker.name.firstName();
//         var randomlName = faker.name.lastName();
//         var randomBorn = faker.date.past();
//         var randomPhone = faker.phone.phoneNumberFormat();
//         var randomCity = faker.address.city();
//         var randomCountry = faker.address.country();

//         const u = {
//             userId: randomID,
//             hash_pass: randomHash_pass,
//             asset: [
//                 {
//                     address: randomAddress,
//                     // private: {type: String, default: ''},
//                 },
//             ],
//             history: [
//                 {
//                     symbol: randomSymbol,
//                 },
//             ],
//             mail: {
//                 email: randomMail,
//             },
//             identity: {
//                 fName: randomfName,
//                 lName: randomlName,
//                 born: randomBorn,
//                 phone: randomPhone,
//                 city: randomCity,
//                 country: randomCountry,
//             },
//         }
//         console.log("u", u)

//         await user.create(u)
//     }
// }
// fakerData()


module.exports = {
    user: user,
};
