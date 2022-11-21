'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../config')

async function resetDB(collectionName) {
    await mongoose.connection.collection(collectionName).deleteMany({})
}

async function encryptPass(plainPassword) {
    const salt = await bcrypt.genSalt(config.bcryptSalt);
    const password = await bcrypt.hash(plainPassword, salt);
    return password
}

module.exports = {
    resetDB,
    encryptPass,
}