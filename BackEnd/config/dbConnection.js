var mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect(
    "mongodb://asifsaythe:asif1267@ds131747.mlab.com:31747/lawyerschat",
    { useNewUrlParser: true },
    function(err) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("successfully connected");
      }
    }
  );
}

module.exports = dbConnection;
