const express = require("express")
const server = express()

server.all("/", (req, res) => {
  res.send("Đã vào server thành công!")
})

function host() {
  server.listen(process.env.PORT || 3000, () => {
    console.log("Đang tiến hành vào server")
  })
}

module.exports = host;