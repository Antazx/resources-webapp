import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  lastLogin: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  customSettings: {},
  customFilters: {},
  role: { type: String, default: 'basic', enum: ['basic', 'maintainer', 'admin'] },
  accesToken: { type: String }
});

const User = mongoose.model('User', userSchema);
export default User;
