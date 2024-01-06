const { auth } = require("../firebase_setup/index");

async function verifyAuth(req, res, next) {
  try {
    const { auth_token } = req.headers;
    await auth.verifyIdToken(auth_token);
    next();
  } catch (e) {
    res.status(401).end();
  }
}

module.exports = verifyAuth;
