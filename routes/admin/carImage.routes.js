const {Router} = require('express')
const adminMiddleware = require('../../middleware/admin.middleware')
const router = Router()


router.delete('', adminMiddleware, function (req, res) {
        const {imgID, carID} = req.query;
        const selectImages = 'select * from carsimages where carID = ?'
        const deleteSQL = 'delete from carsimages where ID = ?'

        global.connectionMYSQL.execute(deleteSQL, [imgID])
            .then(r => {
                return global.connectionMYSQL.execute(selectImages, [carID])
            })
            .then(r => {
                res.json(r[0])
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)

module.exports = router;