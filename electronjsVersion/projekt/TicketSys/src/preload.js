// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  createTicket: async (ticket) => {
    const res = await fetch('http://10.2.3.26:3000/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket)
    });
    return res.json();
  },

  getTicketsByEmail: async (email) => {
    const res = await fetch(
      `http://10.2.3.26:3000/tickets/by-email/${encodeURIComponent(email)}`
    );
    return res.json();
  }
});







