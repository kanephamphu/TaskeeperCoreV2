import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://taskeeper_admin:ranDomPassword1608%%%@cluster0.bctkf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
  },