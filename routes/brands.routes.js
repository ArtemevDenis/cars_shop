const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
//
// const adminMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()

router.get('', function (req, res) {

        const selectBrands = 'select * from brands'

        global.connectionMYSQL.execute(selectBrands)
            .then(r => {
                res.json(r[0])
            }).catch(console.log)
    }
)


module.exports = router;