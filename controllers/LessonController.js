const { Lesson } = require("../models");

const getAll = async (req, res) => {
  console.log("LessonController, req.body:", req.body);
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
  try {
    let entity = parseInt(req.params.id);
    let updatedEntity = await Lesson.update(req.body, {
      where: { account_id: entity },
      returning: true,
    });
    res.send(updatedEntity);
  } catch (error) {
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
