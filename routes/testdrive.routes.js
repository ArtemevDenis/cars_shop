const {Router} = require('express')

//
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post('', authMiddleware, function (req, res) {
        const id = req.user.userID;
        const {carID, date, address} = req.query;
        const insertInto = 'insert into testdrives (carID, userID, date, address) VALUES (?, ?, ?, ?)'
        global.connectionMYSQL.execute(insertInto, [carID, id, date, address])
            .then(r => {
                if (r[0].affectedRows === 1)
                    res.json({message: 'ok'})
                else
                    res.json({error: 'ошибка при добавлении'})
            }).catch(e => {
            res.json({error: e})
        })
    }
)

router.get('', authMiddleware, function (req, res) {
        const id = req.user.userID;
        const select = 'select testdrives.ID, testdrives.date, testdrives.carID, testdrives.address, cars.title, brands.name from testdrives inner join cars on cars.ID = testdrives.carID inner join brands on cars.brandID = brands.ID  where userID = ? order by testdrives.date'
        global.connectionMYSQL.execute(select, [id])
            .then(r => {
                console.log(r[0])
                if (r[0].length >= 1)
                    res.json(r[0])
                else
                    res.json({message: 'в списке нет предстоящих тест драйвов'})
            }).catch(e => {
            res.json({error: e})
        })
    }
)

router.delete('', authMiddleware, function (req, res) {
        const userID = req.user.userID;
        const {id} = req.query;

        const deleteSQL = 'delete from testdrives where ID = ?'
        const select = 'select testdrives.ID, testdrives.date, testdrives.carID, testdrives.address, cars.title, brands.name from testdrives inner join cars on cars.ID = testdrives.carID inner join brands on cars.brandID = brands.ID  where userID = ? order by testdrives.date'

        global.connectionMYSQL.execute(deleteSQL, [id])
            .then(() =>
                global.connectionMYSQL.execute(select, [userID]))
            .then(r => {
                console.log(r[0])
                if (r[0].length >= 1)
                    res.json(r[0])
                else
                    res.json({message: 'в списке нет предстоящих тест драйвов'})
            }).catch(e => {
            res.json({error: e})
        })
    }
)


module.exports = router;