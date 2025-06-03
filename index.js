// index.js

function applyNow() {
  alert("Thank you for your interest! The admissions application will open shortly.");
}

function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById("studentName").value;
  alert("Thank you, " + name + ". Your application has been submitted successfully.");
  document.getElementById("admissionForm").reset();
}

    const countryDropdown = document.getElementById('country');
    const stateDropdown = document.getElementById('state');

    // 1. Fetch countries
    async function fetchCountries() {
      try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/positions');
        const data = await res.json();

        countryDropdown.innerHTML = '<option value="">Select a country</option>';

        data.data.forEach(country => {
          const option = document.createElement('option');
          option.value = country.name;
          option.textContent = country.name;
          countryDropdown.appendChild(option);
        });
      } catch (error) {
        console.error('Error fetching countries:', error);
        countryDropdown.innerHTML = '<option>Error loading countries</option>';
      }
    }

    // 2. Fetch states based on selected country
    async function fetchStates(countryName) {
      try {
        stateDropdown.innerHTML = '<option>Loading states...</option>';
        stateDropdown.disabled = true;

        const res = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: countryName })
        });

        const data = await res.json();

        if (data.data.states && data.data.states.length > 0) {
          stateDropdown.innerHTML = '<option value="">Select a state</option>';
          data.data.states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.name;
            option.textContent = state.name;
            stateDropdown.appendChild(option);
          });
          stateDropdown.disabled = false;
        } else {
          stateDropdown.innerHTML = '<option>No states found</option>';
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        stateDropdown.innerHTML = '<option>Error loading states</option>';
      }
    }

    // Event listener on country dropdown
    countryDropdown.addEventListener('change', () => {
      const selectedCountry = countryDropdown.value;
      if (selectedCountry) {
        fetchStates(selectedCountry);
      } else {
        stateDropdown.innerHTML = '<option>Select a country first</option>';
        stateDropdown.disabled = true;
      }
    });

    // Load countries on page load
    fetchCountries();
