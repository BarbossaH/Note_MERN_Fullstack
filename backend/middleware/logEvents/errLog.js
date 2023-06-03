const logEvent = require('./logEvent');

const errLog = (err, req, res, next) => {
  logEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\t`,
    'errLog.log'
  );

  console.log(err.stack); //?

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: err.message });
};

module.exports = errLog;
