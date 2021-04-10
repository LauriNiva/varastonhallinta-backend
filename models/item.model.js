import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemcode: {
    type: String,
    minlenght: 3
  },
  name: {
    type: String,
    requred: true,
    minlenght: 3
  },
  category: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Item', itemSchema);