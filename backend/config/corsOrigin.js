const allowedList = require('./allowedList');
const corsOption = {
  origin: (origin, callback) => {
    if (allowedList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  },
  optionSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOption;
