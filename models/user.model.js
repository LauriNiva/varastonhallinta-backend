import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
    minlenght: 5
  },
  storages: [{ type: Schema.Types.ObjectId, ref: 'Storage' }],
  items: [{ type: Schema.Types.ObjectId, ref: 'Item'}]
});

export default userSchema;