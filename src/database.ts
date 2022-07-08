import mongoose from 'mongoose';

const connectDB = async() => {
  const db = await mongoose.connect('mongodb://localhost:27017/linkshare');
  console.log(db.connection.name, 'is connected');
}

export { connectDB };