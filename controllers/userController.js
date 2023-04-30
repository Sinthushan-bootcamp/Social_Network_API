const { User, Thought } = require('../models');

module.exports = {
// controller to Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// controller to Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v'); // Select can include or exclude fields since there is a '-' then we are excluding __v field

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// controller to create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// controller to  delete a user and deletes all associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId }); //find and delete the user by ID

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // deletes multiple thoughts filters by checking if the the IDs are in the user thoughts array
      await Thought.deleteMany({ _id: { $in: user.thoughts } }); 
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

// controller to update user with new Friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId} }, // pushes new friend's id into user's friends array
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID',
        });
      }

      res.json('Friend added successfully');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// controller to delete a friend from the friend list
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId} }, // removes the friend id from user's friends array
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID',
        });
      }
      res.json('Friend removed successfully');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

};
