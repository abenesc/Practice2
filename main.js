/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author: Cedrick Abenes A01175380
 *
 */


const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped)
IOhandler.grayScale(pathUnzipped, pathProcessed) // couldnt make it work :(