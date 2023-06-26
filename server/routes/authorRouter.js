const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')

router.get('/', authorController.getAll)
router.get('/:id', authorController.getOne)
router.get('/validation/:id', authorController.checkAuthor)
router.post('/', authorController.createOne)
router.delete('/:id', authorController.deleteOne)
router.put('/:id', authorController.updateOne)

module.exports = router