const { Thought, User } = require('../models');

module.exports = {
// controller to Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// controller to Get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// controller to Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body); // create the thought
      // all thoughts are associated with a User
      // when a thought is created we need to add that thought to the passed in userID
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'no user with that ID',
        });
      }

      res.json('Thought created successfully');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// controller to Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }, // we use the set operator to update the thought
        // we set runValidators to true so any validation will be run and  we set new to true so mongoose returns the updated document
        { runValidators: true, new: true } 
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// controller to Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        // we set new to true so mongoose returns the updated User document with thought removed
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'no user with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
// controller to add a reaction
  async addThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // since reaction is not an object we just need to add the reaction to the thought's reactions array
        { $addToSet: { reactions: req.body } }, 
        // we set runValidators to true so any validation will be run and  we set new to true so mongoose returns the updated document
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// controller to remove a reaction
  async removeThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // removes reaction based on reactionID
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};