const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
//
// const adminMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()


router.get('/', function (req, res) {
        const selectSlide = 'select * from slider'
        global.connectionMYSQL.execute(selectSlide).then(r => {
            res.json(r[0])
        })
    }
)

module.exports = router;