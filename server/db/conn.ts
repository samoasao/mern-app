import { MongoClient, Db } from "mongodb";
const uri = process.env.ATLAS_URI!;

const client = new MongoClient(uri);

let _db: Db;

var dbo = {
  connectToServer: function (callback: any) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("myFirstDatabase");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function (database?: string) {
    return _db;
  },
};

export default dbo;
