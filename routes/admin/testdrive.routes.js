const {Router} = require('express')
const adminMiddleware = require('../../middleware/admin.middleware')
const router = Router()


router.get('', adminMiddleware, function (req, res) {
        const select = 'select users.name AS userName, users.surname AS userSurname, users.email, users.phone, testdrives.ID, testdrives.date, testdrives.carID, testdrives.address, cars.title, brands.name from testdrives inner join cars on cars.ID = testdrives.carID inner join brands on cars.brandID = brands.ID inner join users on users.ID = testdrives.userID order by testdrives.date'
        global.connectionMYSQL.execute(select)
            .then(r => {
                if (r[0].length >= 1)
                    res.json(r[0])
                else
                    res.json({message: 'в списке нет предстоящих тест драйвов'})
            }).catch(e => {
            res.json({error: e})
        })
    }
)

router.delete('', adminMiddleware, function (req, res) {
        const userID = req.user.userID;
        const {id} = req.query;

        const deleteSQL = 'delete from testdrives where ID = ?'
        const select = 'select testdrives.ID, testdrives.date, testdrives.carID, testdrives.address, cars.title, brands.name from testdrives inner join cars on cars.ID = testdrives.carID inner join brands on cars.brandID = brands.ID  where userID = ? order by testdrives.date'

        global.connectionMYSQL.execute(deleteSQL, [id])
            .then(() =>
                global.connectionMYSQL.execute(select, [userID]))
            .then(r => {
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