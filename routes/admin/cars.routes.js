const {Router} = require('express')
const adminMiddleware = require('../../middleware/admin.middleware')
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


router.delete('', adminMiddleware, function (req, res) {
        const {carID} = req.query
        const deleteCar = 'delete from cars where ID = ?'
        const deleteFavorite = 'delete from favorite where carID = ?'
        const deleteReviews = 'delete from reviews where carID = ?'
        const deleteImg = 'delete from carsimages where carID = ?'
        const deleteTestDrives = 'delete from testdrives where carID = ?'


        let selectCars = 'select cars.* , brands.name  AS brand, carsimages.img from cars left join  brands on cars.brandID = brands.ID  left join  carsimages  on  cars.ID = carsimages.carID '

        global.connectionMYSQL.execute(deleteCar, [carID])
            .then(() => global.connectionMYSQL.execute(deleteFavorite, [carID]))
            .then(() => global.connectionMYSQL.execute(deleteReviews, [carID]))
            .then(() => global.connectionMYSQL.execute(deleteImg, [carID]))
            .then(() => global.connectionMYSQL.execute(deleteTestDrives, [carID]))
            .then(() => global.connectionMYSQL.execute(selectCars))
            .then(r => {
                res.json(r[0])
            })
            .catch(e => {
                res.json({error: e})
            })
    }
)


router.post('/edit', [adminMiddleware, upload.array('images')], function (req, res) {
    let {carID} = req.query;
    let {brand, price, year, mileage, title} = JSON.parse(req.body.data);
    let description = JSON.parse(req.body.description);

    const img = req.files;
    const params = [];
    const curDate = new Date().toISOString().slice(0, 10).replace('T', ' ');

    let carsSQl = ''
    let getBrand = 'select * from brands where name = ?'


    if (carID && carID !== 'create') {
        carsSQl = 'update cars set price =?, year =?, brandID =?, mileage =?, title=?,date=?, description =? where ID =?'
        params.push(price, year, mileage, title, curDate, description, carID)
    } else {
        carsSQl = 'insert into cars (price, year, brandID, mileage, date, title, description) values (?,?,?,?,?,?,?)'
        params.push(price, year, mileage, curDate, title, description)
    }


    global.connectionMYSQL.execute(getBrand, [brand])
        .then((r) => {
            params.splice(2, 0, r[0][0].ID)
            return global.connectionMYSQL.execute(carsSQl, params)
        })
        .then(r => {
            if (r[0].insertId) {
                carID = r[0].insertId
            }
            if (img && img.length !== 0) {
                const insertIntoProductsImg = 'insert into carsimages (img, carID) VALUES (?,?)'
                return new Promise(resolve => {
                    for (let i = 0; i < img.length; i++)
                        global.connectionMYSQL.execute(insertIntoProductsImg, [img[i].filename, carID])
                            .catch(e => res.json({error: e}))
                    resolve('ok')
                })

            }
        })
        .then(() => {
            res.json({message: 'ok'})
        })
            .catch(e => {
                res.json({error: e})
            })
    }
)

module.exports = router;