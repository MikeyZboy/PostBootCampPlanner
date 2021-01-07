const { Account } = require('../models')
const { ValidationError } = require("sequelize");

const createAccount = async (req, res) => {
  try {
    let entityBody = {
      ...req.body,
    };
    console.log('USERCONTROLLER: req.body:', entityBody)
    const newAccount = Account.build(entityBody);
    // await newAccount.validate();
    await newAccount.save();
    // const newAccount = await Account.create(entityBody)
    // await newAccount.validate()
    // await newAccount.save()
    res.send(newAccount); // <-- express said this is deprecated?
    // res.status(newAccount).send(newAccount) <-- this is the new way?
    console.log('USERCONTROLLER,createAccount:',newAccount)
    // if there's an error above - consider switching build to create <-- build was a Ted call
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
  console.log('signInUser, req.body:',req.body)
  try {
    const account = await Account.findOne({ //<-- should this be Account.find or Account.findByPk
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
    console.log('USERCONTROLLER: found account:', account)
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
    createAccount,
    signIn
}