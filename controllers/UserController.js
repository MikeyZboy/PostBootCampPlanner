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
    // if there's an error above - consider switching build to create <-- build was a Ted call
  } catch (error) {
    throw error;
  }
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