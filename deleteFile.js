const fs = require('fs');

deleteFile = (link) => {
    fs.stat(`public/${link}`, function (err, stats) {
        console.log(stats);//here we got all information of file in stats variable
        if (err) {
            return console.error(err);
        }
        fs.unlink(`public/${link}`, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
}

module.exports = deleteFile;