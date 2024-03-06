exports.MiddlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user || null;
  // console.log("MiddlewareGlobal - User:", res.locals.user);
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
  next()
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login');
    req.session.save(() => res.redirect('http://localhost:3000/login/index'));
    return;
  }
  next()
}
