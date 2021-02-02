const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
//
// const adminMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()

router.get('', function (req, res) {

        const selectLimits = 'select MIN(price) AS minPrice,  MIN(mileage) AS minMileage  ,  MIN(year) AS minYear, MAX(price) AS maxPrice,  MAX(mileage) AS maxMileage  ,  MAX(year) AS maxYear from cars'

        global.connectionMYSQL.execute(selectLimits)
            .then(r =>
                res.json(r[0][0])
            ).catch(console.log)
    }
)


module.exports = router;