document.getElementById('ticketForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const ticket = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    topic: document.getElementById('topic').value,
    description: document.getElementById('description').value
  };

  const result = await window.api.createTicket(ticket);

  if (result.success) {
    document.getElementById('status').textContent = "Saken er sendt!";
    e.target.reset();
  } else {
    document.getElementById('status').textContent = "Feil ved innsending";
  }
});
