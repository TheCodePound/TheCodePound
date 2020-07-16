const languages = require('../data/languages.json')

module.exports = {
  seed: async (req, res) => {
    // const { confirm } = req.query

    // if (!confirm) {
    //   res.status(400).send('Could not seed db')
    // }

    const db = req.app.get('db')

    try {
      await db.seed()

      await db.languages.insert(languages)

      res.status(200).send('DB Seeded')
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
}