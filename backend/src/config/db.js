const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI;

  try {
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
      return;
    }

    memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri();
    await mongoose.connect(memoryUri);
    console.log("MONGO_URI not set. Using in-memory MongoDB for development.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const closeDb = async () => {
  await mongoose.connection.close();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = { connectDb, closeDb };
