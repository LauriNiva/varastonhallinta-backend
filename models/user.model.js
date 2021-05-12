import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
    minlenght: 5
  },
  storages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Storage' }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

export default mongoose.model('User', userSchema);