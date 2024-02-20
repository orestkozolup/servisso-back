const { db } = require("../firebase_setup/index");
const { SERVICES_COLLECTION } = require("../const/services");

async function getService(id) {
  const serviceSnap = await db.collection(SERVICES_COLLECTION).doc(id).get();
  return serviceSnap.exists ? serviceSnap.data() : {};
}

module.exports = {
  getService,
};
