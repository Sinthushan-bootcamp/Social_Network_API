const { Schema, model } = require('mongoose');
// thought schema 
// values that need to be provided: username and email
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true // removes any leading or trailing spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'invalid email address'] //validates email address by matching regex pattern
    },
    // reference to thought model using array of IDs
    thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'thought',
      },
    ],
    // reference to user model using array of IDs
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // allow virtual field friendCount
    },
    id: false,
  }
);
// virtual field  to get the number of friends
// this field is not present in the database
userSchema
  .virtual('friendCount')

  .get(function () {
    return `${this.friends.length}`;
  })


// use schema to create a User model
const User = model('user', userSchema);
module.exports = User;