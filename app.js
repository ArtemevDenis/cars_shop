const express = require('express');
const path = require('path');
const mysql = require("mysql2");
const config = require('config');
const bodyParser = require("body-parser");


const app = express();

app.use('/images', express.static('public'))

app.use(express.json({extended: true}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/api/v1/slider', require('./routes/slider.routes'))
app.use('/api/v1/cars', require('./routes/cars.routes'))
app.use('/api/v1/reviews', require('./routes/reviews.routes'))
app.use('/api/v1/brands', require('./routes/brands.routes'))
app.use('/api/v1/limits', require('./routes/limits.routes'))
app.use('/api/v1/auth', require('./routes/auth.routes'))
app.use('/api/v1/user', require('./routes/user.router'))
app.use('/api/v1/favorite', require('./routes/favorite.routes'))
app.use('/api/v1/test-drives', require('./routes/testdrive.routes'))
app.use('/api/v1/admin/users', require('./routes/admin/users.routes'))
app.use('/api/v1/admin/test-drives', require('./routes/admin/testdrive.routes'))
app.use('/api/v1/admin/cars', require('./routes/admin/cars.routes'))
app.use('/api/v1/admin/car-images', require('./routes/admin/carImage.routes'))
app.use('/api/v1/admin/reviews', require('./routes/admin/reviews.routes'))


const PORT = config.get('port') || 5000;

const connection = mysql.createPool({
    connectionLimit: 100,
    host: config.get('host'),
    user: config.get('user'),
    database: config.get('database'),
    password: config.get('password')
}).promise();


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '_client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '_client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Start server on port ${PORT}...`);
        })
    } catch (e) {
        console.error('Server Error', e.message)
        process.exit(1);
    }
}

start();


function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

global.connectionMYSQL = connection;