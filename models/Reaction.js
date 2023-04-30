const { Schema, Types } = require('mongoose');
// reaction schema 
// default values: reactionID and createdAt
// values that need to be provided: reactionBody and username
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString() // when we get the date we format it in a more readable way
    },
  },
  {
    toJSON: {
      getters: true, // allow getters for the date
    },
    id: false,
  }
);

module.exports = reactionSchema;