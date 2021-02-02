const {Router} = require('express')

//
// const adminMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()

router.get('', function (req, res) {

        const selectBrands = 'select * from brands'

        global.connectionMYSQL.execute(selectBrands)
            .then(r => {
                res.json(r[0])
            }).catch(e => {
            res.json({error: e})
        })
    }
)


module.exports = router;