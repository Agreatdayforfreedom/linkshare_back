import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  email: string;
  password: string;
  verifyPassword: (password: string) => boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true},
  password: { type: String, required: true }, 
}, {
  timestamps: true, 
  versionKey: false
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.verifyPassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
}

export default mongoose.model('User', userSchema);