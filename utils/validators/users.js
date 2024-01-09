const { USER_FIELDS } = require("../../const/users");

module.exports = {
  validate: (payload) => {
    const lackValues = [];
    Object.values(USER_FIELDS).forEach((key) => {
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
