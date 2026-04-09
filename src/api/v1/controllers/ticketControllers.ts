import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { SupportTicketInterface } from "../../../data/data";
import {
     getHealthStatusService,
      getAllTicketsService,
       getTicketByIdService,
        getTicketUrgencyService,
         createTicketService,
          updateTicketService,
           deleteTicketService,
            PriorityBaseScore,
             ticketStatus,
              HealthCheckResponse,
               AllTicketsInterface,
                TicketUrgencyResponse
            } from "../services/ticketServices";

export const getHealthCheck = (req: Request, res: Response): void => {
    const healthStatus: HealthCheckResponse = getHealthStatusService();
    res.status(HTTP_STATUS.OK).json(healthStatus);
}

export const getTickets = (req: Request, res: Response): void => {
    const allTickets: AllTicketsInterface = getAllTicketsService();
    res.status(HTTP_STATUS.OK).json(allTickets);
}

export const getTicketById = (req: Request, res: Response): void => {
    const ticketId: number = Number(req.params.id);

    if(isNaN(ticketId) || ticketId <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;
    }

    const selectedTicket: SupportTicketInterface | undefined = getTicketByIdService(ticketId);

    if(!selectedTicket){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(selectedTicket);
    }
}

export const getTicketUrgency = (req: Request, res: Response): void => {
    const ticketId: number = Number(req.params.id);

    if(isNaN(ticketId) || ticketId <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;
    };

    const selectedTicket: TicketUrgencyResponse | undefined = getTicketUrgencyService(ticketId);

    if(!selectedTicket){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(selectedTicket);
    }
}

export const createTicket = (req: Request, res: Response): void => {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const priority: string = req.body.priority;
    const status: string = req.body.status;
    const createdAt:string =  req.body.createdAt;

    if(!title){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Missing required field: title"});
        return;
    }

    if(!description){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Missing required field: description"});
        return;
    }

    if(!(priority in PriorityBaseScore)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Invalid priority. Must be one of: critical. high, medium, low"});
        return;
    }

    const newTicket: SupportTicketInterface = createTicketService(title, description, priority, status, createdAt);
    res.status(HTTP_STATUS.OK).json(newTicket);
}

export const updateTicket = (req: Request, res: Response): void => {
    const selectedTicketId: number = Number(req.params.id);

    if(isNaN(selectedTicketId) || selectedTicketId <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;   
    };

    const id: number = Number(req.body.id);
    const title: string = req.body.title;
    const description: string = req.body.description;
    const priority: string = req.body.priority;
    const status: string = req.body.status;
    const createdAt:string =  req.body.createdAt;

    if(!(priority in PriorityBaseScore)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Invalid priority. Must be one of: critical. high, medium, low"});
        return;
    }

    if(!(ticketStatus.includes(status))){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Invalid status. Must be one of: open, in-progress, resolved"});
        return;
    }

    const updatedTicket: SupportTicketInterface[] | undefined =  updateTicketService(selectedTicketId, id, title, description, priority, status, createdAt);

    if(!updatedTicket){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(updatedTicket);
    }
}

export const deleteTicket = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    if(isNaN(id) || id <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;
    };

    const deletedTicket: string | undefined = deleteTicketService(id); 
    if(!deletedTicket){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    }

    res.status(HTTP_STATUS.OK).json(deletedTicket);
}