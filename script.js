let addresses = []; // Lege array die we later vullen met de data uit het JSON-bestand

// Functie om de lijst van adressen weer te geven
function renderAddressList() {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" class="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
            <td><input type="date" id="date-${index}" onchange="setDeliveryDate(${index})"></td>
        `;
        addressListElement.appendChild(tr);
    });
}

// Functie om de bezorgstatus van een adres te wijzigen
function toggleAddress(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        localStorage.setItem(`address-${index}-status`, "bezorgd");
    } else {
        localStorage.removeItem(`address-${index}-status`);
    }
}

// Functie om een bezorgdatum in te stellen
function setDeliveryDate(index) {
    const dateInput = document.getElementById(`date-${index}`);
    const date = dateInput.value;
    localStorage.setItem(`address-${index}-date`, date);
}

// Laad het JSON-bestand met adressen en render ze
fetch('adresgegevens.json')
    .then(response => response.json()) // Zorg ervoor dat het antwoord JSON is
    .then(data => {
        addresses = data; // Vul de array met de geladen data
        renderAddressList(); // Render de lijst met adressen
    })
    .catch(error => {
        console.error('Error loading addresses:', error);
        alert('Er is een probleem met het laden van de adressen. Zorg ervoor dat het JSON-bestand correct is en probeer het opnieuw.');
    });
