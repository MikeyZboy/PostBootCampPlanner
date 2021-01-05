const { User, Account } = require('../models')
const {Sequelize, Op, QueryTypes } = require("sequelize");

const allUsers = async () => {
    const users = await User.findAll()
    console.log(users)
}

const createNewUser = async () => {
  const newUser = await User.create({
    email: "jane@jane.com",
    password: "123456789",
  });
  console.log('New User Created:', newUser) // works
};

const createNewAccount = async () => {
  const newAccount = await Account.create({
    firstName: 'Jane',
    lastName: 'Doe',
    bootcamp: 'Flatiron School',
    goal: 'Full Stack Engineering'
  })
  console.log('New Account Created:', newAccount)
}

const changeSmith = async () => {
  await Account.update({ lastName: 'Smith'},{
    where: {
      lastName: 'Doe'
    }
  })
  console.log('Changed Doe to Smith')
}

const deleteJanes = async () => {
  await Account.destroy({
    where: {
      firstName: 'Jane'
    }
  })
  console.log('Bye Janes') //works
}

const run = async () => {
    try {
        // await allUsers(),
        await createNewUser(),
        await createNewAccount(),
        await changeSmith(),
        await deleteJanes()
    } catch (err) {
        console.log(err)
    } finally {
        process.exit
    }
}

run()