import mongoose from 'mongoose';

const connectDB = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI as string);
  console.log(db.connection.name, 'is connected');
};

export { connectDB };
