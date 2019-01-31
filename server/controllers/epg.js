const get = (req, res, next) => {
  res.send([]);
  return next();
}

exports.get = get