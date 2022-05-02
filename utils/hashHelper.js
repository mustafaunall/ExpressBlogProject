const md5 = require('md5')

class HashHelper{
    constructor() {}
    
    HashPassword(password) {
        return md5(password)
    }
}

module.exports = HashHelper