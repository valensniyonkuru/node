// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    status,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
