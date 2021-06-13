import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
    minlenght: 3
  },
  username: {
    type: String,
    required: true,
    minlenght: 4,
    unique: true
  },
  passwordHash: String,
  storages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Storage' }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);