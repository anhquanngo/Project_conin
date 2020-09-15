const User = require("./user")
class DB {
    constructor() {
        this.User = User
    }
    user = async (filter, updater) => {
        if (typeof updater === 'object') {
            return await this.User.findOneAndUpdate(filter, updater, { new: true })
        }
        if (typeof updater === 'string') {
            if (updater === '') {
                return await this.User.find(filter)
            } else {
                return await this.User.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined') {
            const doc = new this.User(filter)
            return await doc.save()
        }
    }
}

module.exports = DB