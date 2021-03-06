const { Account } = require('../models')

const getOne = async (req, res) => {
  const entityId = parseInt(req.params.id);
  try {
    const entity = await Account.findByPk(entityId, {
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    });
    res.send(entity);
  } catch (error) {
    throw error;
  }
};

const createOne = async (req, res) => {
  try {
    let entityBody = {
      ...req.body,
    };
    const newAccount = Account.build(entityBody);
    await newAccount.validate();
    await newAccount.save();
    res.send(newAccount);
  } catch (error) {
    throw error;
  }
};

const updateOne = async (req, res) => {
  try {
    let entity = parseInt(req.params.id);
    let updatedEntity = await Account.update(req.body, {
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
    await Account.destroy({
      where: { id: entityId },
    });
    res.send({
      message: `Deleted account with id of ${entityId}`,
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
    getOne,
    createOne,
    updateOne,
    deleteOne
}