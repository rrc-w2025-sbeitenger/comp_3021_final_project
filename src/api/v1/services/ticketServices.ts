import { HTTP_STATUS } from "../../../constants/httpConstants";
import {ticketData, SupportTicketInterface} from "../../../data/data";

export interface HealthCheckResponse {
    status: number;
    uptime: number;
    timestamp: string;
    version: string;
}

export interface AllTicketsInterface {
    message: string;
    count: number;
    allTickets: SupportTicketInterface[];
}

export interface TicketUrgencyInterface{
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
}

export interface TicketUrgencyResponse {
    message: string;
    data: TicketUrgencyInterface;
}

export enum PriorityBaseScore{
    'critical' = 50,
    'high' = 30,
    'medium' = 20,
    'low' = 10
}

export const ticketStatus: string[] = [
    'open',
    'in-progress',
    'resolved'
]

/*
*Creates and returns the health status.
*@returns a healthCheckResponse object.
*/
export const getHealthStatusService = (): HealthCheckResponse => {
    return {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
}

/*
*Gets all tickets from data.
*@returns a AllTicketsInterface object, which includes a success message, all tickets, and ticket count.
*/
export const getAllTicketsService = (): AllTicketsInterface => {
    return{
        message: "Tickets Retrieved",
        count: ticketData.length,
        allTickets: ticketData
    };
}

/*
*Gets ticket by id.
*@param (ticketId): Numeric number of the ticketId.
*@return - A AllTicketsInterface object.
*/
export const getTicketByIdService = (ticketId:number): SupportTicketInterface | undefined => {
    const ticket: SupportTicketInterface | undefined = ticketData.find(x => x.id == ticketId);
    return ticket;
}

/*
*(Helper method for getTicketUrgencyService): Calculates the difference in time between the current date and date of when the ticket was opened.
*@param (ticket): Current ticket.
*Return (ticketAge): The age of ticket in days.
*/
const calcDiffInDates = (ticket: SupportTicketInterface): number => {
    const currentDay: Date = (new Date());
    const createdDay: Date  = (new Date(ticket.createdAt));

    //found formula: https://www.spguides.com/calculate-date-difference-in-days-in-typescript/.
    //hours*minutes*seconds*milliseconds.
    const day: number = 24 * 60 * 60 * 1000;
    const diffInTime: number = currentDay.getTime() - createdDay.getTime();
    const ticketAge: number = Math.floor(diffInTime / day);
    return ticketAge;
}

/*
*(Helper method for getTicketUrgencyService): Calculates the urgency score based of the priority score and ticket age.
*@param (ticket): Current ticket.
*@param (ticketAge): The numeric age of the current ticket.
*Return (urgencyScore): Numeric score value that shows it's urgency.
*/
const calcUrgencyScore = (ticket:SupportTicketInterface, ticketAge: number): number => {
    let priorityScore: number;

    priorityScore = (
        ticket.priority === 'critical' ? priorityScore = PriorityBaseScore.critical :
        ticket.priority === 'high' ? priorityScore = PriorityBaseScore.high :
        ticket.priority === 'medium' ? priorityScore = PriorityBaseScore.medium :
        priorityScore = PriorityBaseScore.low
    );
    

    //urgency calculation.
    const urgencyScore: number = Number(priorityScore + (ticketAge * 5));

    return urgencyScore;
}

/*
*(Helper method for getTicketUrgencyService): Finds the urgency message based of the urgencyScore
*@param (urgencyScore): Urgency score number.
*@Return (urgencyMessage): string of the urgency level.
*/
const urgencyMessage = (urgencyScore: number): string => {
    let urgencyMessage: string;
    urgencyMessage = (
        urgencyScore === 0 ? urgencyMessage = 'Minimal. Ticket resolved.' :
        urgencyScore >= 80 ? urgencyMessage = 'Critial. Immediate attention required.' :
        urgencyScore >= 55 ? urgencyMessage = 'High urgency. Prioritize resolution.' :
        urgencyScore > 25 ? urgencyMessage = 'Moderate. Schedule for attention.' :
        urgencyMessage = 'Low urgency. Address when capacity allows.'
    );

    return urgencyMessage;
}

/*
*Get the ticket onject with the urgency calculations
*@param (ticketId): Numeric id of the current ticket.
*@Return: object following the TicketUrgencyResponse, which includes a success message and urgency ticket.
*/
export const getTicketUrgencyService = (ticketId:number): TicketUrgencyResponse | undefined => {
    const ticket: SupportTicketInterface | undefined = ticketData.find(x => x.id == ticketId);

    if(!ticket){
        return undefined;
    }

    const ticketAge: number = calcDiffInDates(ticket);
    let urgencyScore: number;
    let urgencyText: string;

    if (ticket.status === (ticketStatus[0] || ticketStatus[1])){
        urgencyScore = calcUrgencyScore(ticket, ticketAge);
        urgencyText = urgencyMessage(urgencyScore);
    } else {
        urgencyScore = 0;
        urgencyText = urgencyMessage(urgencyScore);
    }
    
    const ticketUrgency: TicketUrgencyInterface = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
        ticketAge: ticketAge,
        urgencyScore: urgencyScore,
        urgencyLevel: urgencyText
    }

    return {
        message: "Ticket urgency calculated",
        data: ticketUrgency
    }
}

/*
*Create a new ticket.
*@param (title): Title of ticket.
*@param (description): Description of ticket.
*@param (priority): Priority of ticket.
*@param (status): Status of ticket.
*@param (createdAt): Created at date for ticket.
*@Return (newTicket): New ticket object.
*/
export const createTicketService = (title:string, description:string, priority: string, status:string, createdAt: string): SupportTicketInterface => {
    const id: number = ticketData.length + 1;
    
    const newTicket: SupportTicketInterface = {
        id: id,
        title: title,
        description: description,
        priority: priority,
        status: status,
        createdAt: createdAt
    }

    ticketData.push(newTicket);

    return newTicket;    
};

/*
*Update existing tickets with new data/properties, by splicing the old ticket out of the ticketData array.
*@param (title): Title of ticket.
*@param (description): Description of ticket.
*@param (priority): Priority of ticket.
*@param (status): Status of ticket.
*@param (createdAt): Created at date for ticket.
*@Return: array with new spliced ticket.
*/
export const updateTicketService = (
                                    selectedTicketId: number,
                                    id: number,
                                    title:string,
                                    description: string,
                                    priority:string,
                                    status:string,
                                    createdAt:string
                                   ): SupportTicketInterface[] | undefined => {
    const ticketIndex: number = ticketData.findIndex(x => x.id === selectedTicketId);
    //not in range of array.
    if(ticketIndex === -1){
        return undefined;
    }

    //splicing out the old ticket starting by its index and then adding a new ticket.
    return ticketData.splice(ticketIndex, 1, {
                                              id:id,
                                              title:title,
                                              description:description,
                                              priority:priority,
                                              status:status,
                                              createdAt:createdAt
                                             });
}

/*
*Deletes the select ticket, by splicing out.
*@param (id): Numeric id of the current ticket.
*@Return: string that confirms the ticket that was removed.
*/
export const deleteTicketService = (id:number): string | undefined => {
    const ticketIndex: number = ticketData.findIndex(x => x.id === id);
    //not in range of array.
    if(ticketIndex === -1){
        return undefined;
    }

    //splice out the ticket without replacing it.
    ticketData.splice(ticketIndex, 1);
    return `Ticket: ${id} was removed!`;
}