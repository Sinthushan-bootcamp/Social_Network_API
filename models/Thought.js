const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// thought schema 
// default values: createdAt
// values that need to be provided: thoughtText and username
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString() // getter to return formatted date when requested
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // user reaction schema
  },
  {
    toJSON: {
      getters: true, // allow getters used in the createdDate field
      virtuals: true, // allow virtual field reactionCount
    },
    id: false,
  }
);
thoughtSchema
// virtual field  to get the number of reactions
// this field is not present in the database
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  })


// use schema to create a Thought model
const Thought = model('thought', thoughtSchema);
module.exports = Thought;