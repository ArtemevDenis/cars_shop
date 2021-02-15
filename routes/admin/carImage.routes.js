const {Router} = require('express')
const adminMiddleware = require('../../middleware/admin.middleware')
const deleteFile = require("../../deleteFile");
const router = Router()


router.delete('', adminMiddleware, function (req, res) {
    const {imgID, carID} = req.query;
    const selectImages = 'select * from carsimages where carID = ?'
    const deleteSQL = 'delete from carsimages where ID = ?'

    const getImgLink = 'select img from carsimages where ID = ?'

    global.connectionMYSQL.execute(getImgLink, [imgID])
        .then(r => {
            deleteFile(r[0][0].img)
            return global.connectionMYSQL.execute(deleteSQL, [imgID])
        })
        .then(() => {
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