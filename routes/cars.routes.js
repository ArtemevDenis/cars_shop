const {Router} = require('express')

const router = Router()


router.get('/full', async function (req, res) {
    const {id} = req.query;

    const selectCars = 'select cars.* , brands.name AS brand from cars left join  brands on cars.brandID = brands.ID  where cars.ID = ?';
    const selectImage = 'select * from carsimages where carID = ?';
    const selectReviews = 'select reviews.* , avatars.img ,users.avatarID,users.name from reviews left join users on users.ID = reviews.userID  left join  avatars  on  users.avatarID = avatars.ID  where carID = ? order by reviews.date desc'
    const params = [id];
    const output = {};
    global.connectionMYSQL.execute(selectCars, params)
        .then(results =>
            output.car = results[0][0]
        )
        .then(() =>
            global.connectionMYSQL.execute(selectImage, params)
        )
            .then(results =>
                output.imgs = results[0]
            )
            .then(() =>
                global.connectionMYSQL.execute(selectReviews, params))
            .then(results =>
                output.reviews = results[0]
            )
            .then(() =>
                res.json(output)
            )
            .catch(e => {
                res.json({error: e})
            })
    }
)

router.get('', function (req, res) {
        const {minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage, brands, limit} = req.query;
        let params = [];
        let selectCars = 'select cars.* , brands.name  AS brand, carsimages.img from cars left join  brands on cars.brandID = brands.ID  left join  carsimages  on  cars.ID = carsimages.carID '
        if (minPrice && maxPrice && minYear && maxYear && minMileage && maxMileage) {
            selectCars += 'where cars.price >= ? AND cars.price <= ? AND cars.year >= ? AND cars.year <= ? AND cars.mileage >= ? AND cars.mileage <= ? ';
            params.push(minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage)
        }
        if (brands && brands !== 'null') {

            const stringParams = brands.split(',').map(brand => `"${brand}"`).join(',')
            selectCars += `AND brands.name IN (${stringParams}) `;
        }
        selectCars += ' order by cars.date desc ';
        if (limit !== undefined) {
            selectCars += 'limit ?';
            params.push(limit);
        }

        global.connectionMYSQL.execute(selectCars, params)
            .then(results => {
                // console.log(results)
                res.json(results[0]);
            }).catch(e => {
            res.json({error: e})
        });
    }
)

module.exports = router;