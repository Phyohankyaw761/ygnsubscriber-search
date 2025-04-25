let allData = [];

// Assuming csvData is declared in data.js
const lines = csvData.trim().split('\n');
const headers = lines[0].split(',').map(h => h.trim());

allData = lines.slice(1).map(line => {
  const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v =>
    v.replace(/^"|"$/g, '').trim()
  );

  const entry = {};
  headers.forEach((header, i) => {
    entry[header] = values[i]?.replace(/^"|"$/g, '').trim() || '';
  });
  return entry;
});

// Enable search input once data is loaded
document.getElementById('searchBox').disabled = false;

document.getElementById('searchBox').addEventListener('input', function () {
  const query = this.value.toLowerCase().trim();
  const filtered = allData.filter(entry =>
    Object.values(entry).some(value =>
      value.toLowerCase().includes(query)
    )
  );
  showResults(filtered);
});

// Function to show results
function showResults(data) {
  const container = document.getElementById('results');
  container.innerHTML = ''; // Clear previous results

  if (data.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }

  data.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="field"><span>1) Account:</span> ${entry['Account'] || ''}</div>
      <div class="field"><span>2) Subscriber Name:</span> ${entry['Subscriber name'] || ''}</div>
      <div class="field"><span>3) Phone Number:</span> ${entry['Phone number'] || ''}</div>
      <div class="field"><span>4) Address:</span> ${entry['Address'] || ''}</div>
      <div class="field"><span>5) Node Name:</span> ${entry['Subscriber node'] || ''}</div>
      <div class="field"><span>6) ONT Serial:</span> ${entry['ONT serial'] || ''}</div>
    `;
    container.appendChild(card);
  });
}
