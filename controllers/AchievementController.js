const { Achievement } = require("../models");
const upload = require('../middleware/awsUpload')

const createOne = async (req, res) => {
  try {
    let achievementImage = await upload(req.file)
    const achievement = await Achievement.create({...req.body, achievementImage})
    res.send(achievement)
  } catch (error) {
    throw error;
  }
};

const getAll = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.send(achievements);
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    await Achievement.destroy({
      where: { id: id },
    })
    res.send({
      message: `deleted achievement with id of ${id}`
    })
  } catch (error) {
    throw error
  }
}

const getOne = async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.achievement_id);
    res.send(achievement);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOne,
  getAll,
  deleteOne,
  getOne
};
