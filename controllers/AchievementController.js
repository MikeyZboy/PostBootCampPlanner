const { Achievement } = require("../models");
const upload = require('../middleware/awsUpload')

//createAchievement
const createOne = async (req, res) => {
  try {
    let achievementImage = await upload(req.file)
    const achievement = await Achievement.create({...req.body, achievementImage})
    res.send(achievement)
  } catch (error) {
    throw error;
  }
};
//getAll
const getAll = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.send(achievements);
  } catch (error) {
    throw error;
  }
};

//deleteOne
const deleteOne = async (req, res) => {
  console.log(req.body)
  try {
    let id = parseInt(req.params.id)
    await Achievement.destroy({
      where: { id: id },
    })
    res.send({
      message: `deleted achievement with id of ${id}`
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

//getOne
const getOne = async (req, res) => {
  console.log(req.body)
  try {
    const achievement = await Achievement.findByPk(req.params.achievement_id);
    // we'll need to check that req.params
    res.send(achievement);
  } catch (error) {
    throw error;
  }
};
//can we delete/remove one?
module.exports = {
  createOne,
  getAll,
  deleteOne,
  getOne
};
