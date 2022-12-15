const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const server = express();
const fetch = require("node-fetch");
const namecard = require(`./json/namecard.json`);
const id = require(`./json/id.json`);
server.all("/", async (req, res) => {
  fetch(`https://enka.network/u/847303896/__data.json`)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      const canvas = createCanvas(1920, 1080);
      const ctx = canvas.getContext("2d");
      // banner
      loadImage(
        `https://enka.network/ui/${
          namecard[`${data.playerInfo.nameCardId}`].picPath[1]
        }.png`
      ).then(async (image) => {
        ctx.drawImage(image, 0, 0, 1920, 1080);
        const avatar = `${
          id[`${data.playerInfo.profilePicture.avatarId}`].SideIconName
        }`;
        const avatarreplace = avatar.replace(/Side_/, "");
        ctx.beginPath();
        ctx.arc(50, 52, 150, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        
        await loadImage(`https://enka.network/ui/${avatarreplace}.png`).then(
          (image1) => {
            ctx.drawImage(image1, 50, 50, 250, 250);

            ctx.beginPath();
            ctx.arc(50 - image.width/2, 0 - image.height/2, 150, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
            res.send('<img src="' + canvas.toDataURL() + '" />');
          }
        );
      });
    });
});
function host() {
  server.listen(process.env.PORT || 3000, () => {
    console.log("[HOST] Đang tạo host....");
  });
}
module.exports = host;
