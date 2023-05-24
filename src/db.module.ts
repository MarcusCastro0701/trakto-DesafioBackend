import { MongoClient } from 'mongodb';
import { Module } from '@nestjs/common';
import { config } from 'dotenv';

config();
const client = new MongoClient(process.env.MONGO_URI);

@Module({
  imports: [],
})
export class DataBaseModule {
  constructor() {
    this.connectToMongo();
  }

  async connectToMongo() {
    try {
      await client.connect();
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
    }
  }
}

const db = client.db(process.env.DB_NAME);
export const exifCollection = db.collection(process.env.COLLECTION_NAME);
