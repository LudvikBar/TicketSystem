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




document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('searchEmail').value;
  const tickets = await window.api.getTicketsByEmail(email);

  const tbody = document.getElementById('ticketTableBody');
  tbody.innerHTML = '';

  if (!tickets || tickets.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5">Ingen saker funnet</td>`;
    tbody.appendChild(row);
    return;
  }

  tickets.forEach(t => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t.id}</td>
      <td>${t.topic}</td>
      <td>${t.description}</td>
      <td>${t.status}</td>
      <td>${new Date(t.created_at).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
});
