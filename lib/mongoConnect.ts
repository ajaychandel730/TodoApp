import { connect } from "http2";
import { MongoClient } from "mongodb";

//type
type GlobalWithMongo = typeof globalThis & {
  _mongoClientPromise?: MongoClient;
};

const MONGO_URI: string = process.env.MONGO_URI;

export default async function (): Promise<MongoClient> {
  try {
    let client: MongoClient;
    let clientPromise: MongoClient;

    if (process.env.NODE_ENV === "development") {
      let globalWithMongo: GlobalWithMongo = global;

      if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(MONGO_URI, {});
        globalWithMongo._mongoClientPromise = await client.connect();
      }
      clientPromise = globalWithMongo._mongoClientPromise;
    } else {
      client = new MongoClient(MONGO_URI, {});
      clientPromise = await client.connect();
    }
    return clientPromise;
  } catch (err: unknown) {
    if (typeof err == "object" && "message" in err)
      console.error("error: ", err.message);
    else console.error(err);
  }
}
