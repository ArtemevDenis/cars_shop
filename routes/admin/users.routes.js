const {Router} = require('express')

const adminMiddleware = require('../../middleware/admin.middleware')
const deleteFile = require("../../deleteFile");
const router = Router()

router.get('', adminMiddleware, function (req, res) {

        const selectUsers = "select  users.ID, users.name, users.role, users.surname, users.email, users.phone, avatars.img AS avatar from users inner join avatars on avatars.ID = users.avatarID where role= 'user'"

        global.connectionMYSQL.execute(selectUsers)
            .then(r => {
                res.json(r[0])
            }).catch(e => {
            res.json({error: e})
        })
    }
)

router.delete('', adminMiddleware, function (req, res) {
        const {userID} = req.query
        const deleteUser = 'delete from users where ID = ?';
        const deleteReviews = 'delete from reviews where userID = ?'

        const selectUsers = "select users.ID, users.name, users.role, users.surname, users.email, users.phone, avatars.img AS avatar from users inner join avatars on avatars.ID = users.avatarID  where role=  'user'"

        const selectAvatar = 'select img from avatars inner join users on users.avatarID = avatars.ID where users.ID = ?';

        global.connectionMYSQL.execute(selectAvatar, [userID])
            .then(r => {
                deleteFile(r[0][0].img)
            })
            .then(() => global.connectionMYSQL.execute(deleteUser, [userID]))
            .then(() => global.connectionMYSQL.execute(deleteReviews, [userID]))
            .then(() => global.connectionMYSQL.execute(selectUsers))
            .then(r => {
                res.json(r[0])
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)


module.exports = router;