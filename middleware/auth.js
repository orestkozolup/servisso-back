const { auth } = require("../firebase_setup/index");

async function verifyAuth(req, res, next) {
  try {
    const { authorization, user_id } = req.headers;
    const user = await auth.verifyIdToken(authorization);

    if (user_id !== user.uid) {
      res.status(403).end();
    } else {
      next();
    }
  } catch (e) {
    res.status(401).end();
  }
}

module.exports = verifyAuth;
