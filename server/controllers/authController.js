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

  login: async (req, res) => {
    const {email, password} = req.body
    const db = req.app.get('db')
    
    const existingUser = await db.get_user_by_email(email)

    if(!existingUser[0]){
      return res.status(404).send('user does not exist')
    }

    const authenticated = bcrypt.compareSync(password, existingUser[0].password)

    if(!authenticated){
      return res.status(403).send('incorrect password or username')
    }

    delete existingUser[0].password
    req.session.user = existingUser[0]
    res.status(200).send(req.session.user)
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  getUser: async (req, res) => {
    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(404)
    }
  },
}