import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { Card } from '@nickgdev/larvitar-types';
import { logger } from '../utils';

dotenv.config();

export class MongoDbClient {
  private readonly dbName: string | undefined;
  private readonly collectionName: string | undefined;
  private readonly dbURI: string | undefined;
  private readonly mongoDbInstance?: MongoClient;

  constructor() {
    logger.info('Attempting to instantiate a mongodb-client...');
    logger.info({
      cluster: process.env.MONGO_DB_CLUSTER_NAME,
      uri: process.env.MONGO_DB_URI,
      collectionName: process.env.MONGO_DB_COLLECTION_NAME,
    });
    this.dbName = process.env.MONGO_DB_CLUSTER_NAME;
    this.dbURI = process.env.MONGO_DB_URI;
    this.collectionName = process.env.MONGO_DB_COLLECTION_NAME;
    this.mongoDbInstance = this.dbURI ? new MongoClient(this.dbURI, { serverApi: ServerApiVersion.v1 }) : undefined;
  }

  async getCardById(id: string): Promise<null | Card> {
    logger.info('Attempting to retrieve card with id ' + id);
    if (!this.mongoDbInstance || !this.dbName || !this.collectionName) {
      logger.warn('mongodb instance is null');
      return null;
    }
    try {
      logger.info('Attempting to connect to the db...');
      await this.mongoDbInstance.connect();
      logger.info('Connected to db!');
      logger.info('Building Query...');
      let db = this.mongoDbInstance.db(this.dbName);
      let collection = db.collection<Card>(this.collectionName);
      const cardQuery = await collection.findOne({ id: id });
      if (!cardQuery) {
        throw new Error('Result of the card query was null.');
      }
      logger.info('Returning cardQuery as ', { cardQuery });
      this.mongoDbInstance.close();
      return cardQuery;
    } catch (e) {
      logger.error('Failed to pull card with id ' + id);
      logger.error(e);
      this.mongoDbInstance.close();
      return null;
    }
  }

  async getCardsByName(name: string): Promise<null | Card[]> {
    if (!this.mongoDbInstance || !this.dbName || !this.collectionName) {
      return null;
    }
    try {
      await this.mongoDbInstance.connect();
      let db = this.mongoDbInstance.db(this.dbName);
      let collection = db.collection<Card>(this.collectionName);
      const cardQueryResultCursor = collection.find({ name });
      this.mongoDbInstance.close();
      return cardQueryResultCursor.toArray();
    } catch (e) {
      this.mongoDbInstance.close();
      return null;
    }
  }
}
