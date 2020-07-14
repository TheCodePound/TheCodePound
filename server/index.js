require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      postCtrl = require('./controllers/postsController'),
      {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env,
      app = express();


app.use(express.static(`${__dirname}/../build`)); // note need this to do yarn run build for digitalOcean

app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 31}, // good for one month
  })
)

// authentication end points
app.post('/auth/register', authCtrl.register)
app.post(`/auth/login`, authCtrl.login)
app.put(`/auth/update`, authCtrl.updateUserInfo)
app.delete(`/auth/logout`, authCtrl.logout)
app.get(`/auth/user`, authCtrl.getUser)

// posts end points
app.post(`/api/post`, postCtrl.createPostContent)
app.post(`/api/post/img/:post_img_id`, postCtrl.createPostImg)
app.post(`/api/post/languages/:post_languages_id`, postCtrl.createPostLanguages)
app.get(`/api/all/posts`, postCtrl.getAllPosts)


massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db)
  console.log('db connected')
  app.listen(SERVER_PORT, () => console.log(`server is running on port ${SERVER_PORT}`))
}).catch(err => console.log('err starting db', err))