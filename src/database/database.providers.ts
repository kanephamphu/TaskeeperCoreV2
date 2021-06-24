import * as mongoose from "mongoose";
const userName = process.env.MONGOUSERNAME;
const password = process.env.MONGOPASSWORD;
export const databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(
                `mongodb+srv://taskeeper_admin:ranDomPassword1608%%%@cluster0.bctkf.mongodb.net/Taskeeper?retryWrites=true&w=majority`
            ),
    },
];
