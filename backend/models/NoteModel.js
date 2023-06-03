const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNumbers',
  start_seq: 300,
});
module.exports = mongoose.model('Note', noteSchema);

/*
if User model does't exist, then we need to create an User mode or it will throw an error
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  //set the fields in User
})
// then create the model based on userSchema
const userModel = mongoose.model("User", userSchema);
*/
