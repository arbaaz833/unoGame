const sharp = require("sharp");
const fs = require("fs");
const path = "./old images/";

fs.readdirSync(path).forEach((file) => {
  const arr = file.split(".");
  if (arr[arr.length - 1] === "jpg") {
    console.log(`${path}${file}`);
    sharp(`${path}${file}`)
      .resize(200)
      .jpeg({ quality: 70 })
      .toFile(`./public/images/${file}`, (e) => console.log(e));
  }
});
