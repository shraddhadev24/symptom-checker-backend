import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoDbUri = process.env.MONGO_CONNECTING_STRING;

    if (!mongoDbUri) {
      throw new Error("Missing Mongo Connection Details");
    }

    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoDbUri, options);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.toString());
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;

export const openDBConnection = () => {
  connectDB()
    .then(() => {
      console.log("MongoDb Connected Successfully");
    })
    .catch((err) => {
      console.log("MongoDb Connection Error:", err);
      throw new Error(err);
    });
};
