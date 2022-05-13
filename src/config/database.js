import mongoose from 'mongoose';

//Conexão com o MongoDB
export default async function mongodbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONN);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log('Error connecting to MongoDB!');
    console.log(error);
  }
}
