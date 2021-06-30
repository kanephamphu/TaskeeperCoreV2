import * as mongoose from "mongoose";
const username = process.env.MONGODBUSERNAME;
const password = process.env.MONGODBPASSWORD;
export const databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(
                "mongodb+srv://taskeeper_admin:ranDomPassword1608@cluster0.bctkf.mongodb.net/TaskeeperDev?retryWrites=true&w=majority"
            ),
    },
];
