const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()


router.get('', function (req, res) {
        const {limit} = req.query;
        const params = [];
        let selectReviews = '';

        selectReviews = 'select reviews.* , avatars.img ,users.avatarID, users.name from reviews left join  users on users.ID = reviews.userID  left join  avatars  on  users.avatarID = avatars.ID  order by reviews.date limit ?'
        params.push(limit)

        global.connectionMYSQL.execute(selectReviews, params)
            .then(r => {
                res.json(r[0])
            }).catch(console.log)
    }
)

module.exports = router;