const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const multer = require('multer');

const router = Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({storage: storage})

router.post(
    '/login',
    (req, res) => {

        const {email, password} = req.body;
        const sql = 'SELECT * FROM users where email=?'
        global.connectionMYSQL.execute(sql, [email])
            .then(results => {
                let user = results[0][0]
                if (!user) {
                    return res.status(400).json({error: 'Пользователь не найден'})
                }
                const isMatch = user.password.includes(password) && password.includes(user.password)
                if (!isMatch) {
                    return res.status(400).json({error: 'Не верный пароль'})
                }
                const token = jwt.sign(
                    {userID: user.ID, userRole: user.role},
                    config.get('jwtSecret'),
                    {expiresIn: '1000h'}
                )
                res.json({token, userID: user.ID, role: user.role, email: user.email})
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)


router.post(
    '/registration',
    upload.single('avatar'),
    (req, res) => {

        const {email, password, passwordRepeat, phone, name, surname} = JSON.parse(req.body.data);
        const {filename} = req.file;

        const sqlCreateUser = 'Insert into users (name, surname, phone, email, password, avatarid) values (?,?,?,?,?,?)';
        const sqlCreateAvatars = 'insert into avatars (img) values (?)';
        if (!password.trim().includes(passwordRepeat.trim()) || !passwordRepeat.trim().includes(password.trim())) {
            res.status(500).json({error: 'Пароли не совподают'})
            return
        }
        global.connectionMYSQL.execute(sqlCreateAvatars, [filename])
            .then(r => {
                const avatarID = r[0].insertId
                return global.connectionMYSQL.execute(sqlCreateUser, [name, surname, phone, email, password, avatarID])

            })
            .then(user => {
                const token = jwt.sign(
                    {userID: user[0].insertId, userRole: 'user'},
                    config.get('jwtSecret'),
                    {expiresIn: '1000h'}
                )
                res.json({token, userID: user[0].insertId, role: 'user', email: email})
            })
            .catch(e => {
                    if (e.errno === 1062) {
                        res.status(500).json({error: 'Email уже занят'})
                    }
                    res.status(500).json({error: e})
                }
            )
    }
)

module.exports = router;