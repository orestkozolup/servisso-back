const admin = require("firebase-admin");

const serviceAccount = require("../credentials.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  auth: admin.auth(),
  db: admin.firestore(),
};
