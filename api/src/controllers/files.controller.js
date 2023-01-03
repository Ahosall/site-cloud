const model = require("../models/file.model");
const { join } = require("path");

module.exports = {
  getFiles: (req, res) => {
    const files = model;
    res.json(files);
  },

  addFiles: (req, res) => {
    console.log(req.body, req.files);

    req.files.forEach((f) =>
      model.push({
        ...req.body,
        location: "/uploads/" + join(f.filename),
      })
    );

    res.sendStatus(200);
  },
};
