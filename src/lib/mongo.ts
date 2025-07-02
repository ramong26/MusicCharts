 import { MongoClient } from "mongodb";
 
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set.");
}
 const client = new MongoClient(uri);
  // 전역에서 MongoClient를 단 1번만 연결하기 위한 변수
 let cachedClient: MongoClient | null = null;

 export async function connectToDB() {
   if (!cachedClient) {
      cachedClient = await client.connect();  // 연결은 딱 한 번
   }
   return cachedClient.db("MusicChart");
 }