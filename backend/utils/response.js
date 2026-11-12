const ok = (res, data, message = "Success", status = 200) => {
  return res.status(status).json({ succeeded: true, message, data });
};

const fail = (res, message = "Something went wrong", status = 400) => {
  return res.status(status).json({ succeeded: false, message, data: null });
};

module.exports = { ok, fail };