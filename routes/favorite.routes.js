const {Router} = require('express')


const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.get('', authMiddleware, function (req, res) {
        const id = req.user.userID;
        const {carID} = req.query;
        const selectStatusByUserIDCarID = 'select status from favorite where carID = ? AND userID = ?'

        global.connectionMYSQL.execute(selectStatusByUserIDCarID, [carID, id])
            .then(r => {
                if (r[0].length === 0) {
                    res.json(false)
                } else {
                    res.json(r[0][0].status)
                }
            }).catch(e => {
            res.json({error: e})
        })
    }
)

router.patch('', authMiddleware, function (req, res) {
        const id = req.user.userID;
        const {carID} = req.query;
        const selectBY = 'SELECT ID FROM favorite WHERE carID = ? AND userID = ?'
        const insert = 'insert into favorite (carID, userID, status) values (?, ?, ?)'
        const update = 'UPDATE favorite SET status = not status WHERE ID = ?'

        global.connectionMYSQL.execute(selectBY, [carID, id])
            .then(r => {
                if (r[0].length === 0)
                    return global.connectionMYSQL.execute(insert, [carID, id, true])
                else
                    return global.connectionMYSQL.execute(update, [r[0][0].ID])
            })
            .then(r => {
                res.json({message: 'ok'})
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)

router.get('/cars', authMiddleware, function (req, res) {
        const id = req.user.userID;

        const selectCars = 'select cars.* , brands.name  AS brand, carsimages.img from cars left join  brands on cars.brandID = brands.ID  left join  carsimages  on  cars.ID = carsimages.carID inner join favorite on favorite.carID = cars.ID where favorite.userID = ? AND status = true'
        global.connectionMYSQL.execute(selectCars, [id])
            .then(r => {
                res.json(r[0])
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)


module.exports = router;