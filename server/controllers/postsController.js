module.exports = {
  searchPosts: async (req, res) => {},

  createPost: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const { user_post_id, title, content, post_img, languages} = req.body

    const newPost = await db.add_post([user_id, user_post_id, title, content, post_img, languages]);
      return res.status(200).send(newPost)

  },

  getAllPosts: async (req, res) => {
    const db = req.app.get('db')

    try{
      const allPosts = await db.get_all_posts()
      res.status(200).send(allPosts)
    } catch (err) {
      console.log(err);
      res.status(404).send('could not get all posts')
    }
  },
  getUserPosts: async (req, res) => {

  },
  updatePosts: async (req, res) => {

  },
  deletePost: async (req, res) => {

  },
  
}