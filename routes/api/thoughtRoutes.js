const router = require('express').Router();
// get controllers
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction,
} = require('../../controllers/thoughtController');

//assign getThought and createThought controllers to Get and Posts request to /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//assign getSingleThought, updateThought and deleteThought controllers to Get, Put, and Delete request to /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//assign addThoughtReaction controllers to Post request to /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addThoughtReaction);

//assign removeThoughtReaction controllers to Post request to /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;
