'use strict'

const userCollection = require('./mongoose')

module.exports = {
    create: async (userData) => {
        return await userCollection.create(userData)
    },
    getByEmail: (email) => {
        return userCollection.findOne({ email: email })
    },
    update: (user) => {
        return userCollection.findOneAndUpdate({ _id: new Object(user.id) }, user, { new: true })
    }
}