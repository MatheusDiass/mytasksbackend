import mongoose from 'mongoose';

const Task = mongoose.model('Task', {
  title: String,
  date: String,
  description: String,
  listId: Number,
  friendIdList: Array,
});

export default Task;
