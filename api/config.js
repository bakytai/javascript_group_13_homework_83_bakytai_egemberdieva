const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/musicApp',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '1039803530252183',
        appSecret: 'ebdfbf36531778d75ce42a20e4e96818'
    }
};