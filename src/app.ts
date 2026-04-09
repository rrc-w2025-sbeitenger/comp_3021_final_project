import express, {Express} from "express";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

//Initialize Express application.
const app: Express = express();
app.use(express.json());

//router handler for tickets.
app.use("/api/v1", ticketRoutes);

export default app;