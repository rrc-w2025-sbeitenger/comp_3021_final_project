export interface SupportTicketInterface{
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
}

export const ticketData: SupportTicketInterface[] = [
    {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: "2026-02-28T10:00:00.000Z"
    },
    {
        id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: "2026-03-01T10:00:00.000Z"
    },
    {
        id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: "2026-02-25T10:00:00.000Z"
    },
    {
        id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: "2026-02-26T10:00:00.000Z"
    },
    {
        id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: "2026-02-22T10:00:00.000Z"
    },
    {
        id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: "2026-02-25T10:00:00.000Z"
    },
    {
        id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after refresh",
        priority: "medium",
        status: "resolved",
        createdAt: "2026-02-21T10:00:00.000Z"
    },
]