const {Router} = require('express')
const adminMiddleware = require('../../middleware/admin.middleware')

const router = Router()

router.delete('', adminMiddleware, function (req, res) {
        const {carID} = req.query
        const deleteCar = 'delete from cars where ID = ?'

        let selectCars = 'select cars.* , brands.name  AS brand, carsimages.img from cars left join  brands on cars.brandID = brands.ID  left join  carsimages  on  cars.ID = carsimages.carID '

        global.connectionMYSQL.execute(deleteCar, [carID])
            .then(() =>
                global.connectionMYSQL.execute(selectCars)
            )
            .then(r => {
                res.json(r[0])
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)

module.exports = router;