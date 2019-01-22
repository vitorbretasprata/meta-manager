/* SELECTS */
export const Category = [
    { value: 'Dev', label: 'Dev' },
    { value: 'Support', label: 'Support' },
    { value: 'Attendance', label: 'Attendance' }
];

export const Importance = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Emergency', label: 'Emergency' }
];

export const Status = [
    { value: 'To Do', label: 'To Do' },
    { value: 'Doing', label: 'Doing' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Done', label: 'Done' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Archived', label: 'Archived' }
];

export const occupation = [
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'support', label: 'Support' }
];

export const team = [    
    { value: 'dev', label: 'Dev' },
    { value: 'support', label: 'Support' },
    { value: 'attendance', label: 'Attendance' }
];

/* API USERS */

export const URL = 'http://localhost:2000/api/auth/login'
export const USERS = 'http://localhost:2000/api/auth/getUsers'
export const REGISTER = 'http://localhost:2000/api/auth/register'
export const RESETPASS = 'http://localhost:2000/api/auth/resetPassword'
export const SENDCODE = 'http://localhost:2000/api/auth/sendCode'

/* API TICKETS */

export const ALTERTICKET = 'http://localhost:2000/api/tickets/alterTicket'
export const TICKETS = 'http://localhost:2000/api/tickets/getTickets'
export const DELETETICKET = 'http://localhost:2000/api/tickets/deleteTicket'
export const FILTER = 'http://localhost:2000/api/tickets/filter'
export const TICKET = 'http://localhost:2000/api/tickets/getTicket'
export const ADDCOMMENT = 'http://localhost:2000/api/tickets/addComment'