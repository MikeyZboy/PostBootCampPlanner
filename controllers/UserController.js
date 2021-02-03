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
    await newAccount.validate()
    await newAccount.save()
    res.send(newAccount)
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
  try {
    const account = await Account.findOne({
      where: {
        email: req.body.email
      },
       include: [
        {
         all: true,
           nested: true,
         },
       ],
     });
    if ( 
      account && 
      (await checkPassword(req.body.password, account.password_digest))
      ) { 
        const payload =
        {
          id: account.id,
          email: account.email
        }
        res.locals.payload = payload
        res.send(account)
        return next()
      }
      res.status(401).send({msg: 'Unauthorized'})
  } catch (error) {
    throw(error)
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