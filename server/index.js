// modules
import express from 'express'
import cors from 'cors'
import connection from './config/database.config.js'
// Routes
import userRouter from './routes/user.route.js'
import customerRouter from './routes/customer.route.js'
import serviceRouter from './routes/service.route.js'
import vehicleRouter from './routes/vehicle.route.js'
import orderRouter from './routes/order.route.js'
import requestRouter from './routes/request.route.js';
import invoiceRouter from './routes/invoice.route.js';

// .env support
import dotenv from 'dotenv'
import auth from './auth/auth.middlewaire.js'
dotenv.config()
const PORT = process.env.PORT
// express app
const app = express()

// middlewares
app.use(cors())
// Middleware to parse JSON
app.use(express.json());
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use("/api/user", userRouter);
app.use("/api/customer", auth ,customerRouter);
app.use("/api/service", auth ,serviceRouter);
app.use("/api/vehicle", auth ,vehicleRouter);
app.use("/api/order", auth ,orderRouter);
app.use('/api/request', auth,requestRouter);
app.use('/api/invoice', auth, invoiceRouter);

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
    console.log(`🟢 Listening on http://localhost:${PORT}`);
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