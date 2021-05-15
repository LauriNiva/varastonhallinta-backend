import mongoose from 'mongoose';

const storageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    id: { type: mongoose.Schema.Types.ObjectId },
    itemcode: { type: String},
    name: { type: String, required: true },
    category: { type: String, required: true },
    stock: Number
  }]
});

export default mongoose.model('Storage', storageSchema);