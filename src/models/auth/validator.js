'use strict'

const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')

const schemaRegister = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

module.exports = {
    validateRegister: (userData) => {
        const { error } = schemaRegister.validate(userData)
        return error
    },
    validateLogin: (credentials) => {
        const { error } = schemaLogin.validate(credentials)
        return error
    },
    isPasswordMatching: (incomingPassword, passwordEncrypted) => {
        const isValidPass = bcrypt.compareSync(incomingPassword, passwordEncrypted)
        return isValidPass
    }
}