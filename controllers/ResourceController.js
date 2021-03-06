const { Resource } = require("../models");

const getAll = async (req, res) => {
  try {
    let accountId = parseInt(req.params.id);
    const resources = await Resource.findAll({
      where: { account_id: accountId },
    });
    res.send(resources);
  } catch (error) {
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
    throw error;
  }
};

const deleteOne = async (req, res) => {
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
    throw error;
  }
};

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
