const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

function main(email, fullname) {
  let tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "TheCodePound@gmail.com",
      pass: "devmountain1@",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const mailOptions = {
    from: '"TheCodePound" <TheCodePound@gmail.com>',
    to: "thecampkid@gmail.com",
    subject: "Welcome to the Pound",
    text: "Welcome email from The Code Pound",
    html: `<!DOCTYPE html>
    <!-- PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> -->
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Code Pound</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
            <tr>
                <td style="padding: 10px 0 30px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #FFDE59; border-collapse: collapse;">
                        <tr>
                            <td align="center" bgcolor="#ffffff" style="padding: 0px 0 0px 0; color: #d8d8d8; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                <a href="https://www.home-social.com" style="color: #ffffff;">
                                <img src='https://media.discordapp.net/attachments/730850944597753877/732351096311382046/codepound_logo.png?width=671&height=671'
                                 alt="Code Pound logo" width="300" height="300" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #ff5757; font-family: Arial, sans-serif; font-size: 36px; text-align: center;">
                                            <b>Welcome ${fullname} to the Pound!</b>
                                        </td>
                                    </tr>
                                    <tr>
                                            <td style="padding: 20px 0 30px 0; color: #38B6FF; font-family: Arial, sans-serif; font-size: 20px; line-height: 22px; text-align: center;">
                                            Thank you for registering and welcome to the CodePound! A social media site geared toward developers and the ability for said developers to share the creative projects they have built throughout their careers. The CodePound is comparable to Instagram in sense of the post comment/ like of each project (the “like” can be a “bone” or something to set itself apart) However, not only does it allow developers to share projects, but receive feedback and or help on projects in order to better refine these projects for live hosting. Thus, when employers or others see these projects there is a more polished project backed by a community of developers who are helping one another grow... Also great for any developer hoping to get some extra teaching experience and learn some new things by helping other developers.
                                            </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td width="260" valign="top">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td>
                                                                    <a href="https://www.home-social.com" style="color: #ffffff;">
                                                                    <img src="https://cdn.discordapp.com/attachments/707416135414448189/732994865276649552/Home_FINAL_2_component.png" alt="Home page" width="100%" height="250" style="display: block;" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 25px 0 0 0; color: #ff5757; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; text-align: center;">
                                                                    Once youre feeling ready to log in, go ahead and check out the home page where you can load all the pounds of other developers and dive right in so you can check out some code and help them out!  
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">
                                                        &nbsp;
                                                    </td>
                                                    <td width="260" valign="top">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td> 
                                                                    <a href="https://www.home-social.com" style="color: #ffffff;">
                                                                    <img src="https://cdn.discordapp.com/attachments/707416135414448189/732994877398188173/Profile_Final_2_component.png" alt="profile page" width="100%" height="250" style="display: block;" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 25px 0 0 0; color: #ff5757; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; text-align: center;">
                                                                    Also once you get going, dont forget to check out your own profile page so you can see the bones from your pounds and the feedback to help you on your way with your code! 
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#38B6FF" style="padding: 30px 30px 30px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #080707; font-family: Arial, sans-serif; font-size: 14px;" width="75%">
                                            &reg; Code Pound, SLC Utah 2020<br/>
                                            <a href="#" style="color: #0c0a0a;"><font color="#0c0a0a">Unsubscribe</font></a> to this newsletter instantly
                                        </td>
                                        <td align="right" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
                                                        <a href="http://www.twitter.com/" style="color: #ffffff;">
                                                            <img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/43-twitter-512.png" alt="Twitter" width="38" height="38"  border="0" />
                                                        </a>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                    <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
                                                        <a href="http://www.facebook.com/" style="color: #ffffff;">
                                                            <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_black-512.png" alt="Facebook" width="38" height="38"  border="0" />
                                                        </a>
                                                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                    <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
                                                        <a href="http://www.pinterest.com/" style="color: #ffffff;">
                                                            <img src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-3-512.png" alt="Instagram" width="38" height="38"  border="0" />
                                                        </a>
                                                    </td>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`,
  }

  tranporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("email sent:" + info.response)
    }
  })
}

module.exports = {
  register: async (req, res) => {
    // console.log(req.body)
    const { full_name, email, password, profile_pic } = req.body
    const db = req.app.get("db")

    const existingUser = await db.check_user(email)

    if (existingUser[0]) {
      return res.status(409).send("user already exists")
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const [newUser] = await db.register_user([full_name, email, hash, profile_pic])

    req.session.user = newUser
    res.status(200).send(req.session.user)
    // console.log(email, full_name)
    main(email, full_name)
  },

  login: async (req, res) => {
    const { email, password } = req.body
    const db = req.app.get("db")

    const existingUser = await db.get_user_by_email(email)

    if (!existingUser[0]) {
      return res.status(404).send("user does not exist")
    }

    const authenticated = bcrypt.compareSync(password, existingUser[0].password)

    if (!authenticated) {
      return res.status(403).send("incorrect password or username")
    }

    delete existingUser[0].password
    req.session.user = existingUser[0]
    res.status(200).send(req.session.user)
  },

  updateUserInfo: async (req, res) => {
    // console.log(req.body)
    // console.log(req.session.user)
    const db = req.app.get("db")
    const { user_id } = req.session.user
    const { full_name, email, new_email, password, new_password, profile_pic } = req.body

    const existingUser = await db.get_user_by_email(email)
    if (!existingUser[0]) {
      return res.status(404).send("user does not exist")
    }

    const authenticated = bcrypt.compareSync(password, existingUser[0].password)
    if (!authenticated) {
      return res.status(403).send("incorrect password")
    }

    const salt = bcrypt.genSaltSync(10)
    const newHash = bcrypt.hashSync(new_password, salt)

    const [newInfo] = await db.update_user_info([
      user_id,
      full_name,
      email,
      new_email,
      password,
      newHash,
      profile_pic,
    ])

    req.session.user = newInfo
    res.status(200).send(req.session.user)
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  getUser: async (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(404)
    }
  },
}
