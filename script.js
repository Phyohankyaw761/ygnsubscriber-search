let allData = [];

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  allData = lines.slice(1).map(line => {
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v =>
      v.replace(/^"|"$/g, '').trim()
    );
    const entry = {};
    headers.forEach((header, i) => {
      entry[header] = values[i]?.trim() || '';
    });
    return entry;
  });

  // Trigger default view or reset if needed
  showResults(allData);
}

fetch('data.csv')
  .then(response => response.text())
  .then(csv => {
    parseCSV(csv);

    const searchInput = document.getElementById('searchBox');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (!query) {
        showResults(allData); // Show all when input is cleared
        return;
      }

      const filtered = allData.filter(entry =>
        Object.values(entry).some(value =>
          value.toLowerCase().includes(query)
        )
      );

      showResults(filtered);
    });
  });

function showResults(data) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }

  data.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="field"><span>1) Account:</span> ${entry['Account']}</div>
      <div class="field"><span>2) Scriber Name:</span> ${entry['Subscriber name']}</div>
      <div class="field"><span>3) Phone Number:</span> ${entry['Phone number']}</div>
      <div class="field"><span>4) Address:</span> ${entry['Installation address']}</div>
      <div class="field"><span>5) Node Name:</span> ${entry['Subscriber node']}</div>
      <div class="field"><span>6) ONT Serial:</span> ${entry['ONT serial']}</div>
    `;
    container.appendChild(card);
  });
}
