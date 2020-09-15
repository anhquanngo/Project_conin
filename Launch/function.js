
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

module.exports = {
    launch: launch,
};
