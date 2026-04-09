import express, { Router } from "express";
import {
     getHealthCheck,
      getTickets,
       getTicketById,
        getTicketUrgency,
         createTicket,
          updateTicket,
           deleteTicket
        } from "../controllers/ticketControllers";

const router:Router = express.Router();

router.get("/health", getHealthCheck);
router.get("/tickets", getTickets);
router.get("/tickets/:id", getTicketById); 
router.get("/tickets/:id/urgency", getTicketUrgency);
router.post("/tickets", createTicket);
router.put("/tickets/:id", updateTicket);
router.delete("/tickets/:id", deleteTicket);

export default router;
