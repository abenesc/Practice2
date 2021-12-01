/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs").promises,
  fsc = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

const unzipDir = path.join(__dirname, 'unzipped')

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  fs.mkdir(unzipDir)
  .then(()=> console.log("dir created"))
  .catch((err) => console.log(err))
  
  fsc.createReadStream(pathIn)
  .pipe(unzipper.Extract({ path: pathOut }))
  .promise()
  .then(() => console.log('extraction operation complete'), e => (console.log('error',e)))
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  fs.readdir(dir)
  .then((files) => {
      files.forEach(file => {
          if (path.extname(file) == "." + "png") {
              console.log(path.join(__dirname,'unzipped',file))
          }
      })
  })
  .catch((err) => console.log(err))
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fsc.createReadStream(pathIn)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        // invert color
        this.data[idx] = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
        this.data[idx + 1] = (this.data[idx + 1]  + this.data[idx] + this.data[idx + 2]) / 3;
        this.data[idx + 2] = (this.data[idx + 2] + this.data[idx + 1] + this.data[idx]) / 3;

      }
    }

    this.pack().pipe(fs.createWriteStream(pathOut));
  })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
