const User = require("../src/db/models").User;
const passport = require("passport");
const bcrypt = require("bcryptjs");

module.exports = {

signUp(req, res, next){

  let newUser = ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(newUser.password, salt);

  return User.create({
    name: newUser.name,
    email: newUser.email,
    password: hashedPassword
  })
  .then((user) => {
    passport.authenticate("local")(req, res, () => {
    console.log("Successful sign up!");
    res.json({
       message: 'Sign up successful'
     });
    })
  })
  .catch((err) => {
    console.log(err);
  })

},

signIn(){

},

signOut(){
  
}

}