const User = require('../models/Users')
const { handlePassword, matchPassword } = require('../helpers/passwordHandle')

class UserController {

    static login(req, res) {
        res.render('auth/login')
    }

    static async access(req, res)
    {
        const {email, password} = req.body

        const user = await User.findOne({where: { email: email}})
        if(!user)
        {
            res.render('auth/login', {
                message: 'User not found.'
            })
            return
        }

        const passwordMatch = matchPassword(password, user.password)

        if(!passwordMatch)
        {
            res.render('auth/login', {
                message: 'Invalid password!'
            })
            return
        }

        //session
        req.session.userid = user.id
        req.flash('message', 'Login done')

        req.session.save(()=>{
            res.redirect('/login')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async create(req, res) {
        console.log('entrou em create')
        const { firstname, lastname, email, password, confirmPassword } = req.body
        //password match validation
        if (password != confirmPassword) {
            req.flash('message', 'The password and confirm password is not equal.')
            res.render('auth/register')
            return
        }

        //e-mail validation
        const checkIfUserExists = await User.findOne({ where: { email: email } })
        if(checkIfUserExists)
        {
            req.flash('message', 'The email entered already exists.')
            res.render('auth/register')
            return
        }

        const hashedPassword = handlePassword(password)

        const user = {
            firstname,
            lastname,
            email,
            password: hashedPassword
        }

        User.create(user)
        .then((user)=>{
            console.log('salvou o dado')
            req.session.userId = user.id
            req.flash('message', 'Account created successfully') 
            req.session.save(()=>{
                res.redirect('/login')
            }) 
        })
        .catch((err)=>{
            console.log('Error on create user ', err)
            req.flash('message', 'Error on create account. Try again')
            res.render('auth/register')
        })
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
}

module.exports = UserController