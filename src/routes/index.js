'use strict'

const router = require('express').Router()

const authRoutes = require('../models/auth/routes')
const userRoutes = require('../models/user/routes')

router.use('/healthcheck', (req, res) => res.send('OK'))
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

module.exports = router