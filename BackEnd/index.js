//import nodemodule
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
const cookieparser = require("cookie-parser");
const passport = require("passport");
var axios = require("axios");
//import from custom files
var wholeObj = require("./someFile");
var userRoute = require("./routes/user");
var todosRoutes = require("./routes/todos");
var dbConnection = require("./config/dbConnection");
var setupPassport = require("./config/passportConfig");
const PORT = process.env.PORT || 5000;

//app create
var app = express();

var server = app.listen(PORT)
var io = require("socket.io").listen(server);
//add middleware
app.use(cors());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "@#^&$!#_)(@!#)**(@^%*&^*#${}|{@#$@#$(#@",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/test", (req, res) => {
  res.json("server is working");
});

//db connection
dbConnection();

//setup passport
setupPassport();

// socketio connect
io.on("connection", socket => {
  console.log("succefully connect to socket");
  wheaterForcasting(socket);
});
const wheaterForcasting = async socket => {
  await axios
    .get(
      "https://api.darksky.net/forecast/c568c96ecf56f118d7c99a56b180741f/37.8267,-122.4233"
    )
    .then(res => {
      console.log("res", res.data.currently);
      socket.emit("getWheather", res.data.currently.temperature);
    })
    .catch(err => {
      console.log("err", err);
    });
};
// app.get("/", (req, res)=>{
//   res.status(200).json("server working!")
// })
///user routes
app.use("/user", userRoute);
// app.use('/todo/api/v1.0', todosRoutes);

app.use(express.static("./public"));


// app.listen(PORT, function() {
//   console.log("express server running on port 5000");
// });
