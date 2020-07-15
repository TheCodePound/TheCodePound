const { renderSync } = require("node-sass");

module.exports = {
  searchPosts: async (req, res) => {},

  createPostContent: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const { title, content} = req.body
    
      const newPost = await db.add_post({user_id, title, content});
      const user_junction_id = req.session.user.user_id
      const post_junction_id = newPost[0].post_id
      await db.get_post_id_in_junction([user_junction_id, post_junction_id])
       res.status(200).send(newPost)

  },

  createPostImg: async (req, res) => {
    const db = req.app.get('db')
    const user_img_id = req.session.user.user_id
    const {post_img_id} = req.params
    const {img} = req.body

    const newImg = await db.new_img({user_img_id, post_img_id, img})
    res.status(200).send(newImg)

  },

  // getImgByPostId: async (req, res) => {
  //   const db = req.app.get('db')
  //   const {user_img_id} = req.params

  //   const imgsForPosts = await db.get_all_img_by_post([user_img_id])
  //   res.status(200).send(imgsForPosts)
  // },

  createPostLanguages: async (req, res) => {
    const db = req.app.get('db')
    const user_languages_id = req.session.user.user_id
    const {post_languages_id} = req.params
    const {languages} = req.body

    const newImg = await db.new_language({user_languages_id, post_languages_id, languages})
    res.status(200).send(newImg)
  },

  getLanguagesByPostId: async (req, res) => {

  },

  createPostComments: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const {post_comments_id} = req.params
    const {comments} = req.body

    const makeComment = await db.new_comment({user_id, post_comments_id, comments})
    res.status(200).send(makeComment)
  },

  getAllPosts: async (req, res) => {
    const db = req.app.get('db')

    try{
      const allPosts = await db.get_all_post()
      res.status(200).send(allPosts)
    } catch (err) {
      res.status(404).send('could not get posts', err)
    }
  },

  getAllUserPosts: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user

    const userPosts = await db.get_all_user_posts([user_id])
    res.status(200).send(userPosts)
  },

  getPostById: async (req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params

    const onePostById = await db.get_post_by_id([post_id])
    res.status(200).send(onePostById)
  },


  updatePost: async (req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params
    const {title, content} = req.body

    const updatedContent = await db.update_post_content([post_id, title, content])
    res.status(200).send(updatedContent)
  },

  deleteImgById: async (req, res) => {
    const db = req.app.get('db')
    const {img_id} = req.params

    const deleteImg = await db.delete_img_by_id([img_id])
    res.status(200).send(deleteImg)
  },

  deleteLanguageById: async (req, res) => {
    const db = req.app.get('db')
    const {languages_id} = req.params

    const deleteImg = await db.delete_language_by_id([languages_id])
    res.status(200).send(deleteImg)
  },

  deletePostImg: async (req, res) => {
    const db = req.app.get('db')
    const {post_img_id} = req.params

    const deleteImg = await db.delete_post_img([post_img_id])
    res.status(200).send(deleteImg)
  },

  deletePostLanguages: async (req, res) => {
    const db = req.app.get('db')
    const {post_languages_id} = req.params

    const deleteLanguages = await db.delete_post_languages([post_languages_id])
    res.status(200).send(deleteLanguages)
  },

  deletePostContent: async (req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params

    const deleteContent = await db.delete_post_content([post_id])
    res.status(200).send(deleteContent)
  },
  
}