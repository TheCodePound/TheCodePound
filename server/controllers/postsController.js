module.exports = {
  searchPosts: async (req, res) => {},

  createPost: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    // const {user_post_id} = req.params
    const { user_post_id, title, content, post_img, languages} = req.body
    // console.log(id)
    // console.log(req.session.user)
    const newPost = await db.add_post([user_id, user_post_id, title, content, post_img, languages]);
      return res.status(200).send(newPost)

  },

  getAllPosts: async (req, res) => {},
  getUserPosts: async (req, res) => {},
  updatePosts: async (req, res) => {},
  deletePost: async (req, res) => {},
  
}