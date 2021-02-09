const { Gallery } = require("../../models");

exports.addImage = async (req, res) => {
  try {
    const gallery = await Gallery.create({
      name: req.body.name,
      fileName: req.files.imageFile[0].filename,
    });

    res.send({
      data: {
        gallery,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
