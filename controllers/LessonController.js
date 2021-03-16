const { Lesson } = require("../models");

const getAll = async (req, res) => {
  try {
    let entityId = parseInt(req.params.id);
    const lessons = await Lesson.findAll({
      where: { account_id: entityId },
    });
    res.send(lessons);
    console.log(
      "LessonController,getAll, entityId,lessons:",
      entityId,
      lessons
    );
  } catch (error) {
    console.log(error)
    throw error;
  }
};

const createOne = async (req, res) => {
  console.log("LessonController, createOne HIT:", req.body);
  const accountId = req.params.account_id;
  try {
    let lessonBody = {
      account_id: accountId,
      ...req.body,
    };
    let lessonData = await Lesson.create(lessonBody);
    res.send(lessonData);
  } catch (error) {
    console.log(error)
    throw error;
  }
};
// borrow from TodoController <-- myd project
const getOne = async (req, res) => {
  try {
    let entityId = req.params.id;
    const entity = await Lesson.findByPk(entityId);
    res.send(entity);
  } catch (error) {
    throw error;
  }
};

const updateOne = async (req, res) => {
  console.log('LessonController updateOne HIT, req.params.id, req.body,', req.params.id, req.body)
  try {
    let entity = parseInt(req.params.id);
    let updatedEntity = await Lesson.update(req.body, {
      where: { id: entity },
      returning: true,
    });
    res.send(updatedEntity);
  } catch (error) {
    console.log(error)
    throw error;
  }
};

const deleteOne = async (req, res) => {
  console.log('deleteOne:', req)
  try {
    let entityId = parseInt(req.params.id);
    await Lesson.destroy({
      where: { id: entityId },
    });
    res.send({
      message: `Deleted lesson with id of ${entityId}`,
      options: {
        deleted: true,
        recordId: entityId,
      },
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
};

module.exports = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
