const router = require('express').Router();
// get controllers
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

//assign getUsers and createUser controllers to Get and Posts request to /api/users
router.route('/').get(getUsers).post(createUser);
//assign getSingleUser and deleteUser controllers to Get and Delete request to /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
//assign addFriend and deleteFriend controllers to Post and Delete request to /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
