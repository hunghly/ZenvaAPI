import mongoose from 'mongoose';

// Similar to JDBC
mongoose.connect('mongodb+srv://<USER>:<PASSWORD>@zenvarest-api.w9uau.mongodb.net/<DBNAME>?retryWrites=true&w=majority');

export default mongoose;