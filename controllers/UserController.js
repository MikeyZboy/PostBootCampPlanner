const { Account } = require('../models')
const { ValidationError } = require("sequelize");

const createAccount = async (req, res) => {
  try {
    let entityBody = {
      ...req.body,
    };
    const newAccount = Account.build(entityBody);
    // await newAccount.validate();
    await newAccount.save();
    res.send(newAccount);
  } catch (error) {
    if (error instanceof ValidationError) {
      return console.error(
        "Captured validation error: ",
        error.errors[0].message
      );
    }
    throw error;
  }
};

const signIn = async (req, res, next) => {
  const accountEmail = req.body.email;
  const accountPassword = req.body.password;
  try {
    const account = await Account.findOne({
      where: {
        email: accountEmail,
        password: accountPassword,
      },
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    });
    res.send(account);
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
    createAccount,
    signIn
}