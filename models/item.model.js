import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
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

export default itemSchema;