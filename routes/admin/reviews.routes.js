const {Router} = require('express')
const adminMiddleware = require('../../middleware/admin.middleware')
const router = Router()


router.delete('', adminMiddleware, function (req, res) {
        const {reviewID, carID} = req.query;
        const selectReviews = 'select reviews.* , avatars.img ,users.avatarID,users.name from reviews left join users on users.ID = reviews.userID  left join  avatars  on  users.avatarID = avatars.ID  where carID = ? order by reviews.date desc'
        const deleteSQL = 'delete from reviews where ID = ?'

        global.connectionMYSQL.execute(deleteSQL, [reviewID])
            .then(r => {
                return global.connectionMYSQL.execute(selectReviews, [carID])
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