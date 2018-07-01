const queryMid = (req, res, next) => {

  console.log('hello from query middleware');
  req.parsedQuery = req.query;
  next();
}

export default queryMid;
