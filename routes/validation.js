module.exports = {
  
  validateUsers(req, res, next){
    if(req.method === "POST"){
      req.checkBody("email", "email must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters long").isLength({min: 6});
      req.checkBody("passwordConfirmation", "must match password").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if(errors){
      req.flash("error", errors);
     return res.redirect(req.headers.referer);
    } else {
      return next();
    }

  }
  
}