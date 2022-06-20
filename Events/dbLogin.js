const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB
const db = new MongoClient(url, { useNewUrlParser: true});
db.connect((err, db) => {
    if (err) throw err;
    console.log('[CONNECT] Kết nối thành công đến MongoDB');
})

module.exports = db;