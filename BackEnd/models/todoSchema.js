var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  id: String,
  title: String,
  desc: String,
  done: Boolean,
  createAt: String,
});

var todoModels = mongoose.model('todo', todoSchema);

module.exports = todoModels;
