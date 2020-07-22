const { renderSync } = require("node-sass")

module.exports = {
  
  createPostContent: async (req, res) => {
    const db = req.app.get("db")
    const { user_id } = req.session.user
    const { title, content } = req.body

    const newPost = await db.add_post({ user_id, title, content })
    const user_junction_id = req.session.user.user_id
    const post_junction_id = newPost[0].post_id
    await db.get_post_id_in_junction([user_junction_id, post_junction_id])
    res.status(200).send(newPost)
  },

  allInOnePost: async (req, res) => {
    const db = req.app.get("db")
    const { user_id } = req.session.user
    const d = Date()
    const post_date = d.slice(0,15)
    const { title, content, img, languages, languages_img } = req.body

    const newPost = await db.add_post({ user_id, title, content, post_date })
    const user_junction_id = req.session.user.user_id
    const post_junction_id = newPost[0].post_id
    await db.get_post_id_in_junction([user_junction_id, post_junction_id])
    // note start of img
    const user_img_id = req.session.user.user_id
    const post_img_id  = newPost[0].post_id

    const [newImg] = await db.new_img({ user_img_id, post_img_id, img })
    // start of languages
    const user_languages_id = req.session.user.user_id
    const post_languages_id = newPost[0].post_id

    const newLanguage = await db.new_language({user_languages_id, post_languages_id, languages, languages_img})
    res.status(200).send(newPost, [newImg], newLanguage)
  },
  
  createPostImg: async (req, res) => {
    const db = req.app.get("db")
    const user_img_id = req.session.user.user_id
    const { post_img_id } = req.params
    const { img } = req.body

    const newImg = await db.new_img({ user_img_id, post_img_id, img })
    res.status(200).send(newImg)
  },

  createPostLanguages: async (req, res) => {
    const db = req.app.get("db")
    const user_languages_id = req.session.user.user_id
    const {post_languages_id} = req.params
    const {languages, languages_img} = req.body

    const newImg = await db.new_language({user_languages_id, post_languages_id, languages, languages_img})
    res.status(200).send(newImg)
  },

  getLanguagesByPost: async (req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params

    const languagesByPost = await db.get_languages_by_post_id(post_id)
    res.status(200).send(languagesByPost)
  },

  getAllLanguages: async (req, res) => {
    const db = req.app.get('db')
    
    const getLanguages = await db.get_all_languages()
    res.status(200).send(getLanguages)
  },


  createPostComments: async (req, res) => {
    const db = req.app.get("db")
    const d = Date()
    const comments_date = d.slice(0,15)
    const { user_id } = req.session.user
    const { post_comments_id } = req.params
    const { comments } = req.body

    const makeComment = await db.new_comment({ user_id, post_comments_id, comments_date, comments })
    res.status(200).send(makeComment)
  },

  giveBone: async (req, res) => {
    const db = req.app.get('db')
    const {post_bones_id} = req.params
    const {bones} = req.body

    const addBone = await db.add_bone([post_bones_id, bones])
    res.status(200).send(addBone)
    
  },

  sumUserBones: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
  
    const sumMyBones = await db.sum_user_bones(user_id)
    res.status(200).send(sumMyBones)
  },

  sumPostBones: async (req, res) => {
    const db = req.app.get('db')
    const {post_bones_id} = req.params
  
    const sumPostBones = await db.sum_post_bones(post_bones_id)
    res.status(200).send(sumPostBones)
  },

  getAllPosts: async (req, res) => {
    const db = req.app.get("db")

    
      const allPosts = await db.get_all_post()
      // console.log(' all posts', allPosts)
        const postIdMap = async() => Promise.all( allPosts.map(async (e) => {
        const post_id =  e.post_id
        const getAllComments = await db.get_all_comments(post_id)
       
        // console.log('get all comments', getAllComments, getAllBones)
        // console.log('bones', getAllBones)
        return getAllComments;
      }))

      const postForBonesMap = async() => Promise.all(allPosts.map(async (e) => {
        const post_bones_id = e.post_id
        const getAllBones = await db.sum_post_bones(post_bones_id)
        return getAllBones
      }))
     const comments = await postIdMap() 
     const bones = await postForBonesMap() 
    //  console.log('comments', comments)
    //  console.log('bones', bones)
     res.status(200).send( [allPosts, bones, comments]) 

  },

  getAllUserPosts: async (req, res) => {
    const db = req.app.get("db")
    const { user_id } = req.session.user

    const userPosts = await db.get_all_user_posts([user_id])
    const commentMap = async() => Promise.all( userPosts.map(async (e) => {
      const post_id =  e.post_id
      const getAllComments = await db.get_all_comments(post_id)
     
      console.log('get all comments', getAllComments)
      return getAllComments;
    }))
    const bonesMap = async() => Promise.all(userPosts.map(async (e) => {
      const post_bones_id = e.post_id
      const getAllBones = await db.sum_post_bones(post_bones_id)
      return getAllBones
    }))


    const comments = await commentMap() 
    const bones = await bonesMap() 

    res.status(200).send([userPosts, bones, comments]) 
  },

  getPostById: async (req, res) => {
    console.log(req.params)
    const db = req.app.get("db")
    const { post_id } = req.params

    const onePostById = await db.get_post_by_id([post_id])
    const commentMap = async() => Promise.all( onePostById.map(async (e) => {
      const post_id =  e.post_id
      const getAllComments = await db.get_all_comments(post_id)
     
      console.log('get all comments', getAllComments)
      return getAllComments;
    }))
    const bonesMap = async() => Promise.all(onePostById.map(async (e) => {
      const post_bones_id = e.post_id
      const getAllBones = await db.sum_post_bones(post_bones_id)
      return getAllBones
    }))
    const comments = await commentMap()
    const bones = await bonesMap() 
    res.status(200).send([onePostById, bones, comments])
  },

  updatePost: async (req, res) => {
    const db = req.app.get("db")
    const { post_id } = req.params
    const { title, content } = req.body

    const updatedContent = await db.update_post_content([post_id, title, content])
    res.status(200).send(updatedContent)
  },

  deleteBone: async (req, res) => {
    const db = req.app.get('db')
    const {bones_id} = req.params

    const takeBackBone = await db.delete_bone(bones_id)
    res.status(200).send(takeBackBone)
  },

  deleteImgById: async (req, res) => {
    const db = req.app.get("db")
    const { img_id } = req.params

    const deleteImg = await db.delete_img_by_id([img_id])
    res.status(200).send(deleteImg)
  },

  deleteLanguageById: async (req, res) => {
    const db = req.app.get("db")
    const { languages_id } = req.params

    const deleteImg = await db.delete_language_by_id([languages_id])
    res.status(200).send(deleteImg)
  },

  deletePostImg: async (req, res) => {
    const db = req.app.get("db")
    const { post_img_id } = req.params

    const deleteImg = await db.delete_post_img([post_img_id])
    res.status(200).send(deleteImg)
  },

  deletePostLanguages: async (req, res) => {
    const db = req.app.get("db")
    const { post_languages_id } = req.params

    const deleteLanguages = await db.delete_post_languages([post_languages_id])
    res.status(200).send(deleteLanguages)
  },

  deleteComments: async (req, res) => {
    const db = req.app.get("db")
    const { post_comments_id } = req.params

    const deleteComments = await db.delete_post_comments([post_comments_id])
    res.status(200).send(deleteComments)
  },

  deletePostContent: async (req, res) => {
    const db = req.app.get("db")
    const { post_id } = req.params

    const deleteContent = await db.delete_post_content([post_id])
    res.status(200).send(deleteContent)
  },
  
  deleteAllOfPost: async (req, res) => {
    const db = req.app.get("db")
    const { post_id } = req.params

    try{
      const deleteContent = await db.delete_post([post_id])
      res.status(200).send(deleteContent)
    }catch (err){
      res.status(500).send('could not delete')
    }

  }
}
