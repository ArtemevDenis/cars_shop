const {Router} = require('express')
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware')


const router = Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({storage: storage});


router.get('/', authMiddleware, function (req, res) {
        const id = req.user.userID
        const selectUserData = 'select users.avatarID, users.email, users.phone, users.surname, users.name, avatars.img from users left join avatars on users.avatarID = avatars.ID where users.ID = ?'


        global.connectionMYSQL.execute(selectUserData, [id])
            .then(r => {
                res.json(r[0][0])
            }).catch(e => {
            res.json({error: e})
        })
    }
)

router.post('/', [authMiddleware, upload.single('avatar')], function (req, res) {

    const id = req.user.userID;
        const {email, phone, name, surname} = JSON.parse(req.body.data);
        const {filename} = req.file;

        const sqlCreateAvatars = 'insert into avatars (img) values (?)';
        const updateUsers = 'update users set name = ?, surname = ?, phone = ?, email = ?, avatarID = ? where ID = ?'

        global.connectionMYSQL.execute(sqlCreateAvatars, [filename])
            .then(r => {
                const avatarID = r[0].insertId
                return global.connectionMYSQL.execute(updateUsers, [name, surname, phone, email, avatarID, id])
            })
            .then(r => {
                res.json({message: 'ok'})
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)


router.post('/fields', [authMiddleware], function (req, res) {

    const id = req.user.userID;
    const {email, phone, name, surname} = req.body;

    const updateUsers = 'update users set name = ?, surname = ?, phone = ?, email = ? where ID = ?'
    const selectUserData = 'select users.avatarID, users.email, users.phone, users.surname, users.name, avatars.img from users left join avatars on users.avatarID = avatars.ID where users.ID = ?'

    global.connectionMYSQL.execute(updateUsers, [name, surname, phone, email, id])
        .then(
            global.connectionMYSQL.execute(selectUserData, [id]))
        .then(r => {
            res.json(r[0][0])
        })
        .catch(e => {
            res.json({error: e})
        })
    }
)

module.exports = router;