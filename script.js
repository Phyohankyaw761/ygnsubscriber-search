let allData = [];

fetch('https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=download&id=1kiCWRgDm0RG_D-y03v4JxWscnmPa7Haa') // Using CORS Proxy
  .then(response => response.text())
  .then(csv => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        allData = results.data;

        // Event listener to handle input changes
        document.getElementById('searchBox').addEventListener('input', function () {
          const query = this.value.toLowerCase().trim();
          
          // If search box is cleared, show all data
          if (query === '') {
            showResults(allData);
            return;
          }
          
          const filtered = allData.filter(entry =>
            Object.values(entry).some(value =>
              value?.toLowerCase().includes(query)
            )
          );
          showResults(filtered);
        });
      }
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
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
      <div class="field"><span>1) Account:</span> ${entry['Account'] || ''}</div>
      <div class="field"><span>2) Subscriber Name:</span> ${entry['Subscriber name'] || ''}</div>
      <div class="field"><span>3) Phone Number:</span> ${entry['Phone number'] || ''}</div>
      <div class="field"><span>4) Address:</span> ${entry['Installation address'] || ''}</div>
      <div class="field"><span>5) Node Name:</span> ${entry['Subscriber node'] || ''}</div>
      <div class="field"><span>6) ONT Serial:</span> ${entry['ONT serial'] || ''}</div>
    `;
    container.appendChild(card);
  });
}
