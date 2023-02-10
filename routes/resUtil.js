/**
 * 统一响应错误
 * @param {*} err
 * @param {*} code
 * @returns
 */
exports.getError = function (err, code) {
  const errCode = code || err?.code || 500;
  let errMsg = "";
  if (typeof err === "string") {
    errMsg = err;
  } else {
    errMsg = err?.message || "server internal error";
  }
  return {
    code: errCode,
    msg: errMsg,
  };
};

/**
 * 统一响应结果
 * @param {*} data
 * @param {*} msg
 * @param {*} code
 * @returns
 */
exports.getResult = function (data = null, msg = "", code = 0) {
  return {
    code,
    msg,
    data,
  };
};

exports.asyncHandler = function (handler, msg, code) {
  return async (req, res, next) => {
    try {
      res.send(exports.getResult(await handler(req, res, next), msg, code));
    } catch (error) {
      next(error);
    }
  };
};
