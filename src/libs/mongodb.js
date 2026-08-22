import mongoose from "mongoose";

const connectMongoDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("Database is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);  // Exit the process with failure
    }
};

export default connectMongoDb;
