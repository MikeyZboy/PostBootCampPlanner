const { Resource } = require("../models");

const getAll = async (req, res) => {
  try {
    let accountId = parseInt(req.params.id);
    const resources = await Resource.findAll({
      where: { account_id: accountId },
    });
    res.send(resources);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createOne = async (req, res) => {
  const accountId = req.params.account_id;
  try {
    let resourceBody = {
      account_id: accountId,
      ...req.body,
    };
    let resourceLink = await Resource.create(resourceBody);
    res.send(resourceLink);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateOne = async (req, res) => {
  try {
    let entity = parseInt(req.params.id);
    let updatedEntity = await Resource.update(req.body, {
      where: { id: entity },
      returning: true,
    });
    res.send(updatedEntity);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteOne = async (req, res) => {
  console.log("deleteOne hit:", req.body);
  try {
    let entityId = parseInt(req.params.id);
    await Resource.destroy({
      where: { id: entityId },
    });
    res.send({
      message: `Deleted resource with id of ${entityId}`,
      options: {
        deleted: true,
        recordId: entityId,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
