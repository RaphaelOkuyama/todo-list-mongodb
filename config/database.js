import mongoose from 'mongoose'; 

const mongoURI = 'mongodb://localhost:27017/YOUR-MONGODB';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Falha ao conectar com o MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;