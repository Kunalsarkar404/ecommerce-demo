const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const  mongoURI = "mongodb://127.0.0.1:27017/usertable";
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("MongoDB connection error:", err)
        process.exit(1);
    }
}

module.exports = connectDB;