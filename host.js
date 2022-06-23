const express = require("express")
const server = express()

server.all("/", (req, res) => {
  res.send("[HOST] Đã tạo host thành công!")
})

function host() {
  server.listen(process.env.PORT || 3000, () => {
    console.log("[HOST] Đang tạo host....")
  })
}

module.exports = host;