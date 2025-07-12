// modules
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connection from './config/databaseConfig.js'
// .env support
dotenv.config()

const PORT = process.env.PORT
// express app
const app = express()
// middlewares
app.use(cors())


// successful connection message on get request to root
app.get('/' , (req, res)=>{
    res.status(200).json({
        status : "Success",
        message : "Surver is up ✅"
    })
})

// start the server if the environment variable START_APP is set to true
if (process.env.START_APP === 'true') {
   
// ✅ Test DB Connection
const testConnection = async () => {
  let signal;
  try {
    signal = await connection.getConnection();
    console.log("✅ MySQL connected via pool!");
    return true;
  } catch (err) {
    console.error("❌ MySQL error:", err); //Logging the Whole Error object for debugging
    return false;
  } finally {
    if (signal) signal.release();
  }
};

// ✅ Start the server
const startServer = async () => {
  console.log(" Testing database connection...");
  const isConnected = await testConnection();

  if (!isConnected) {
    console.error("Failed to connect to database. Exiting...");
    process.exit(1); //Kills the app if database fails
  }
 //Start Listening
  const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });

  // Handle server startup errors
  server.on("error", (err) => {
    console.error("Server startup error:", err.message);
    process.exit(1);
  });
};
// Start everything
startServer();
} else {
    console.log("Missing envirometal variable START_APP")
}