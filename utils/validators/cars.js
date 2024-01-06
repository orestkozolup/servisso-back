const { CAR_FIELDS } = require("../../const/cars");

module.exports = {
  validate: (payload) => {
    const lackValues = [];
    Object.values(CAR_FIELDS).forEach((key) => {
      if (!(key in payload)) {
        lackValues.push(key);
      }
    });

    if (lackValues.length !== 0) {
      return `${lackValues.join(", ")} is/are required field(s)`;
    }

    return false;
  },
};
