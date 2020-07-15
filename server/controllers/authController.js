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
    to: "jairohmsford77@hotmail.com",
    subject: 'Welcome to the Pound',
    text: 'Welcome email from The Code Pound',
    html: `<body style="text-align: center; border: solid 1px #FFDE59;">
    <div style="position: relative; display: flex; align-items:center; justify-content: space-evenly; top: 20px; width:100%;">
      <img style="background-color: transparent;width:50%;position:relative;top:10px;" src='https://media.discordapp.net/attachments/730850944597753877/732351096311382046/codepound_logo.png?width=671&height=671'/>
      <div style="width:50%; text-align: center;position:relative">      
        <h1 style="color: #FF5757;">Welcome ${full_name}!</h1>
        <img src="https://media.discordapp.net/attachments/731323786837753868/732662496569196564/Bone.gif" style="width:100%;height:100%;position: relative; top: 50px;"/>
      </div>
    </div>
    <div style="display:flex; justify-content: center; width:100%;">
      <h2 style="color:#38B6FF; position:relative; width:100%;">Thank you for joining Code Pound!</h2>
    </div>
    <div style="width:100%; margin-bottom: 20px; display: flex; justify-content: center;">
    
      <h3 style="color:#FF5757; width: 100%; text-align:center;">Welcome to the CodePound! A social media site geared toward developers and the ability for said developers to share the creative projects they have built throughout their careers. The CodePound is comparable to Instagram in sense of the post comment/ like of each project (the “like” can be a “bone” or something to set itself apart) However, not only does it allow developers to share projects, but receive feedback and or help on projects in order to better refine these projects for live hosting. Thus, when employers or others see these projects there is a more polished project backed by a community of developers who are helping one another grow... Also great for any developer hoping to get some extra teaching experience and learn some new things by helping other developers.</h3>
    </div>
    <img src='https://omundy.files.wordpress.com/2012/04/i-will-not-write-any-more-bad-code.gif'/>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/07d2dXHYb94" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
      console.log(email, full_name)
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
    main(email, "Pablo")
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