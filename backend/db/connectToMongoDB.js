import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		if (!process.env.MONGO_DB_URI) {
			throw new Error("MONGO_DB_URI environment variable is not defined");
		}

		await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		
		console.log("✅ Connected to MongoDB successfully");
		
		// Handle connection events
		mongoose.connection.on('error', (err) => {
			console.error('❌ MongoDB connection error:', err);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('⚠️ MongoDB disconnected');
		});

		mongoose.connection.on('reconnected', () => {
			console.log('🔄 MongoDB reconnected');
		});

	} catch (error) {
		console.error("❌ Error connecting to MongoDB:", error.message);
		process.exit(1); // Exit the process if database connection fails
	}
};

export default connectToMongoDB;
