const fs = require("fs");

function createLogRequest(fileName) {
  return (req, res, next) => {
    console.log("This Middleware 1");
    fs.appendFile(
      fileName,
      `\n${Date.now()} : ${req.ip} - ${req.method} : ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { createLogRequest };
