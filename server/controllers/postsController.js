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
      res.status(404).send(err)
    }

  },
  getUserPosts: async (req, res) => {},
  updatePosts: async (req, res) => {},
  deletePost: async (req, res) => {},
  
}