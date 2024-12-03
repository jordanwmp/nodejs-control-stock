const bcrypt = require('bcryptjs')

const handlePassword = (password, workFactor = 10) =>{
    const salt = bcrypt.genSaltSync(workFactor)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}

const matchPassword = (password, passwordGiven) => {
    return bcrypt.compareSync(password, passwordGiven)
}

module.exports = {
    handlePassword,
    matchPassword
}