module.exports = {
  searchPosts: async (req, res) => {},

  createPostContent: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const { title, content} = req.body
    // console.log(user_post_id)
    // const {user_post_id} = req.session.user.user_id
    
    const newPost = await db.add_post({user_id, title, content});
      return res.status(200).send(newPost)

  },

  createPostImg: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const {post_img_id} = req.params
    const {img} = req.body

    const newImg = await db.new_img({user_id, post_img_id, img})
    res.status(200).send(newImg)

  },

  createPostLanguages: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const {post_languages_id} = req.params
    const {languages} = req.body

    const newImg = await db.new_language({user_id, post_languages_id, languages})
    res.status(200).send(newImg)
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

  updatePosts: async (req, res) => {},


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