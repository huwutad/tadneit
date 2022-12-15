const { model, Schema } = require('mongoose')
const nguoidung = model('osuData', new Schema({
    _id: String,
    name: String,
}))

module.exports = {
    nguoidung
}