import mongoose from 'mongoose';

const Group = mongoose.model('Group', {
  name: String,
  taskIdList: Array,
});

export default Group;
