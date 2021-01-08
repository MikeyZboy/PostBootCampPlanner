const { Person } = require("../models");
const upload = require('../middleware/awsUpload')

//createAchievement
const CreatePerson = async (req, res) => {
  try {
    let achievementImage = await upload(req.file)
    const person = await Person.create({...req.body, achievementImage})
  } catch (error) {
    throw error;
  }
};
//getAll
const GetPeople = async (req, res) => {
  try {
    const people = await Person.findAll();
    res.send(people);
  } catch (error) {
    throw error;
  }
};
//getOne
const GetPerson = async (req, res) => {
  try {
    const person = await Person.findByPk(req.params.person_id);
    res.send(person);
  } catch (error) {
    throw error;
  }
};
//can we delete/remove one?
module.exports = {
  CreatePerson,
  GetPeople,
  GetPerson,
};
