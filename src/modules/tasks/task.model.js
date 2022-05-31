import mongoose from 'mongoose';

const Task = mongoose.model('Task', {
  title: String,
  date: String,
  description: String,
  group: String,
  friends: Array,
  userId: String,
});

export default Task;
