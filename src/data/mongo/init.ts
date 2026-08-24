import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: any;
}

export class MongoDatabase {
    static async connect(options: ConnectionOptions): Promise<void> {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            console.log('Connected to MongoDB');

        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
}