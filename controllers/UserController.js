const { User } = require('../models/User')

const createUser = async (req, res) => {
  try {
    let entityBody = {
      ...req.body,
    };
    console.log('USERCONTROLLER: req.body:', entityBody)
    const newUser = User.build(entityBody);
    // await newAccount.validate();
    await newUser.save();
    res.send(newUser);
    console.log('USERCONTROLLER,createUser() created:', newUser)
  } catch (error) {
    // if (error instanceof ValidationError) {
    //   return console.error(
    //     "Captured validation error: ",
    //     error.errors[0].message
    //   );
    }
    throw error;
};

const signInUser = async (req, res, next) => {
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
    console.log('USERCONTROLLER: found account:', account)
    console.log('USERCONTROLLER: what is next?',next)
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
    createUser,
    signInUser
}