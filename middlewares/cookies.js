const cookieMid = (req, res, next) => {
  // check if client sent cookie
  var cookie = req.cookies;
  
  if (Object.keys(cookie).length) {
    // cookie is present
    req.parsedCookie = cookie;
  } else {
    res.cookie('test', { foo: 'bar' });
  }
  next();
};

export default cookieMid;
