const { Account } = require('../models')
const { ValidationError } = require("sequelize");
const { 
  checkPassword,
  generatePassword
} = require('../middleware/passwordHandler')


const createAccount = async (req, res) => {
  try {
    const body = req.body
    const password_digest = await generatePassword(body.password)
    const newAccount = Account.build({
      ...req.body,
      password_digest
    })
    await newAccount.save()
    res.send(newAccount)
  } catch (error) {
    console.log(error)
  }
  // try {
  //   let entityBody = {
  //     ...req.body,
  //   };
  //   const newAccount = Account.build(entityBody);
  //   await newAccount.save();
  //   res.send(newAccount);
  // } catch (error) {
  //   if (error instanceof ValidationError) {
  //     return console.error(
  //       "Captured validation error: ",
  //       error.errors[0].message
  //     );
  //   }
  //   throw error;
  // }
};

// const signIn = async (req, res, next) => {
//   const accountEmail = req.body.email;
//   const accountPassword = req.body.password;
//   try {
//     const account = await Account.findOne({
//       where: {
//         email: accountEmail,
//         password: accountPassword,
//       },
//       include: [
//         {
//           all: true,
//           nested: true,
//         },
//       ],
//     });
//     res.send(account);
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

const signIn = async (req, res, next) => {
  try {
    const user = await Account.findOne({
      where: {
        email: req.body.email
      }
    })
      if ( 
        user && 
        (await checkPassword(req.body.password, user.password_digest))
      ) { 
        const payload = {
          _id: user._id,
          name: user.name
        }
        res.locals.payload = payload
        return next()
      }
      res.status(401).send({msg: 'Unauthorized'})
  } catch (error) {
    console.log(error)
  }
}

const refreshSession = (req, res) => {
  const token = res.locals.token;
  res.send(token);
};

module.exports = {
    createAccount,
    signIn,
    refreshSession
}