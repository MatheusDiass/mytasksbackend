import mongoose from 'mongoose';

const Task = mongoose.model('Task', {
  title: String,
  date: String,
  description: String,
  listId: String,
  friendIdList: Array,
  userId: String,
});

export default Task;
