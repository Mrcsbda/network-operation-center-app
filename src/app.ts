import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { PrismaClient } from "./generated/prisma/client";

(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'LOW',
    //         message: "Server started",
    //         origin: "src/app.ts",
    //     },
    // });

    const logs = await prisma.logModel.findMany(
        {
            where: {
                level: 'MEDIUM'
            }
        }
    );

    console.log("All logs:", logs);
    // Server.start();
}