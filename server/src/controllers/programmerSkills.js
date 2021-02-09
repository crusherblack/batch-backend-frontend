const { Programmer, Skill } = require("../../models");

exports.getProgrammers = async (req, res) => {
  try {
    const programmers = await Programmer.findAll({
      include: {
        model: Skill,
        as: "skills",
      },
    });

    res.send({
      status: "success",
      message: "Programmers Successfully Retrieved",
      data: {
        programmers,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      include: {
        model: Programmer,
        as: "programmer",
      },
    });

    res.send({
      status: "success",
      message: "Skills Successfully Retrieved",
      data: {
        skills,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
