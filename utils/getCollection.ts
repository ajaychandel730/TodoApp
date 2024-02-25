import { Collection } from "mongodb";
import client from "../lib/mongoConnect";

export async function getCollection (dbName:string, collectionName:string):Promise<Collection<Document>>{
 const clientInstance = await client();
 return clientInstance.db(dbName).collection(collectionName);
};