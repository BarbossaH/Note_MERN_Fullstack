const logEvent = require('./logEvent');

const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.url}\t${req.headers.origin}\n`, 'reqLog.log');
  console.log(`${req.method}  ${req.path}`);
  next();
};

module.exports = logger;
