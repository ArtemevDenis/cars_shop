const {Router} = require('express')

//
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.get('', authMiddleware, function (req, res) {
        const id = req.user.userID;
        const {carID, data, address} = req.query;
        const insertInto = 'insert into * from brands'

        global.connectionMYSQL.execute(selectBrands)
            .then(r => {
                res.json(r[0])
            }).catch(e => {
            res.json({error: e})
        })
    }
)


module.exports = router;