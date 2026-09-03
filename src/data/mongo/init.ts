import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: any;
}

export class MongoDatabase {
    static async connect(options: ConnectionOptions): Promise<any> {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            return true
        } catch (error) {
            throw error;
        }
    }
}