import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2
  }
});

export default mongoose.model('Category', categorySchema);