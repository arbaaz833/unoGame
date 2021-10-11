const sharp = require("sharp");
const fs = require("fs");
const path = "./public/unoCardsImages/";

fs.readdirSync(path).forEach((file) => {
  const arr = file.split(".");
  if (arr[arr.length - 1] === "jpg") {
    console.log(`${path}${file}`);
    sharp(`${path}${file}`)
      .resize(200, 200, { fit: "contain" })
      .jpeg({ quality: 70 })
      .toFile(`./compressed/${file}`, (e) => console.log(e));
  }
});
