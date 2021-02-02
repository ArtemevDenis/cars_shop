const {Router} = require('express')

const router = Router()


router.get('/', function (req, res) {
        const selectSlide = 'select * from slider'
        global.connectionMYSQL.execute(selectSlide).then(r => {
            res.json(r[0])
        }).catch(e => {
            res.json({error: e})
        })
    }
)

module.exports = router;