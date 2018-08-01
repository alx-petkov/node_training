const queryMid = (req, res, next) => {

  req.parsedQuery = req.query;
  next();
}

export default queryMid;
