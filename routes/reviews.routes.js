const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()


router.get('', function (req, res) {
        const {limit, carID} = req.query;
        let baseSQL = 'select reviews.* , avatars.img ,users.avatarID, users.name from reviews left join  users on users.ID = reviews.userID  left join  avatars  on  users.avatarID = avatars.ID '
        const params = []
        if (carID) {
            baseSQL += 'where carID = ? '
            params.push(carID)
        }
        baseSQL += 'order by reviews.date desc '
        if (limit) {
            baseSQL += 'limit ?'
            params.push(limit)
        }
        global.connectionMYSQL.execute(baseSQL, params)
            .then(r => {
                res.json(r[0])
            }).catch(e => {
            res.json({error: e})
        })
    }
)


router.post('', authMiddleware, function (req, res) {
        const userID = req.user.userID;
        const {review, carID} = req.query;

        const insertReviews = 'insert into reviews (text, carID, userID, date) values (?, ?, ?, ?)'

        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        global.connectionMYSQL.execute(insertReviews, [review, carID, userID, date])
            .then(r => {
                res.json(r[0])
            }).catch(e => {
            res.json({error: e})
        })
    }
)

module.exports = router;