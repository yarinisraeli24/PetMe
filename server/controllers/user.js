

const getUsers = async (req, res, next) => {
    res.send('this is my user')
}
const addUsers = async (req, res, next) => {
    res.send('adding new user')
}

module.exports = {
    getUsers,
    addUsers
}
