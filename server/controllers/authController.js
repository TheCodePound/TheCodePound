const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res) => {
      const {full_name, email, password, profile_pic} = req.body
      const db = req.app.get('db')
  
      const existingUser = await db.check_user(email)
  
      if(existingUser[0]){
        return res.status(409).send('user already exists')
      }
  
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
  
      const [newUser] = await db.register_user([full_name, email, hash, profile_pic ])
  
      req.session.user = newUser
      res.status(200).send(req.session.user)
  },

  login: (req, res) => {},
  logout: (req, res) => {},
  getUser: (req, res) => {},
}