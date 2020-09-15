const Launch = require("./Launch")
class DB {
    constructor() {
        this.Launch = Launch
    }
    launch = async (filter, updater) => {
        if (typeof updater === 'object') {
            return await this.Launch.findOneAndUpdate(filter, updater, { new: true })
        }
        if (typeof updater === 'string') {
            if (updater === '') {
                return await this.Launch.find(filter)
            } else {
                return await this.Launch.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined') {
            const doc = new this.Launch(filter)
            return await doc.save()
        }
    }
}

module.exports = DB