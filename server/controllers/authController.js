const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

function main(email, full_name) {

  let tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'TheCodePound@gmail.com',
      pass: 'devmountain1@'
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    from: '"TheCodePound" <TheCodePound@gmail.com>',
    to: email,
    subject: 'Welcome to the Pound',
    text: 'Welcome email from The Code Pound',
    html: `<body style="text-align: center;">
        <h1 style="color: #38B6FF;">Welcome ${full_name}!</h1>
          <img style="background-color: transparent;width:200px;position:relative;top:10px;" src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficons8-dog-64.png?v=1594436168204"/>
        <h2 style="color:#FF5757; position:relative;top:0px;">Thank you for joining Code Pound</h2>
        <h3 style="color:#FFDE59;position:relative;top:0px;">Welcome to the CodePound! A social media site geared toward developers and the ability for said developers to share the creative projects they have built throughout their careers. The CodePound is comparable to Instagram in sense of the post comment/ like of each project (the “like” can be a “bone” or something to set itself apart) However, not only does it allow developers to share projects, but receive feedback and or help on projects in order to better refine these projects for live hosting. Thus, when employers or others see these projects there is a more polished project backed by a community of developers who are helping one another grow... Also great for any developer hoping to get some extra teaching experience and learn some new things by helping other developers.</h3>
         </body>`
  }

  tranporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    }
    else {
      console.log('email sent:' + info.response)
    }
  })
}


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
      main(email, full_name)
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

  updateUserInfo: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const {full_name, email, new_email, password, new_password, profile_pic} = req.body

    const existingUser = await db.get_user_by_email(email)

    if(!existingUser[0]){
      return res.status(404).send('user does not exist')
    }

    const authenticated = bcrypt.compareSync(password, existingUser[0].password)
    if(!authenticated){
      return res.status(403).send('incorrect password')
    }
    
    const salt = bcrypt.genSaltSync(10)
    const newHash = bcrypt.hashSync(new_password, salt)

    const [newInfo] = await db.update_user_info([user_id, full_name, email, new_email, password, newHash, profile_pic ])
  
    req.session.user = newInfo
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