const serviceModel = require("../../models/services.model");

async function getService(req, res) {
  try {
    const service = await serviceModel.getService(req.params.id);

    if (Object.keys(service).length === 0) {
      res.status(404).end();
    } else {
      res.status(200).json({
        ...service,
        id: req.params.id,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getService,
};
