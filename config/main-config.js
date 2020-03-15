require("dotenv").config();
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const cors = require("cors")
//const passportConfig = require("./passport-config");


module.exports = {
 
  init(app){
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookies: { maxAge: 1.21e+9 }
   }));
   app.use(cors());
   //passportConfig.init(app);

    }
};