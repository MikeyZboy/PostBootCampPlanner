const { User } = require('./models/user')
const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

const allUsers = async () => {
    const users = await User.findAll()
    console.log(users)
}

const createNewUser = async () => {
  const newUser = await User.create({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@jane.com",
    password: "123456789",
  });
  console.log('New User Created:', newUser) // works
};

const changeSmith = async () => {
  await User.update({ lastName: 'Smith'},{
    where: {
      lastName: 'Doe'
    }
  })
  console.log('Changed Doe to Smith')
}

const deleteJanes = async () => {
  await User.destroy({
    where: {
      firstName: 'Jane'
    }
  })
  console.log('Bye Janes') //works
}

const run = async () => {
    try {
        await allUsers(),
        await createNewUser(),
        await changeSmith(),
        await deleteJanes()
    } catch (err) {
        console.log(err)
    } finally {
        process.exit
    }
}

run()
