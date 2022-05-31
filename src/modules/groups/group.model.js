import mongoose from 'mongoose';

const Group = mongoose.model('Group', {
  name: String,
  tasks: Array,
  userId: String,
});

export default Group;
