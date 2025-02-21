// Functie om het JSON-bestand in te lezen en de adressen weer te geven
function loadJsonFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0]; // Verkrijg het bestand

    if (!file) {
        alert("Selecteer een bestand.");
        return;
    }

    const reader = new FileReader(); // Maak een bestand-lezer aan
    reader.onload = function(e) {
        try {
            // Parse de JSON-inhoud van het bestand
            const addresses = JSON.parse(e.target.result);

            // Render de adressen
            renderAddressList(addresses);
        } catch (error) {
            alert("Fout bij het lezen van het bestand.");
        }
    };

    // Lees het bestand als tekst
    reader.readAsText(file);
}

// Functie om de lijst van adressen weer te geven
function renderAddressList(addresses) {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg

    // Loop door de adressen en voeg ze toe aan de tabel
    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" class="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
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

// Functie voor het toevoegen van een bezorging (voorbeeld, kun je verder aanpassen)
function addDelivery() {
    alert('Functie om bezorging toe te voegen is nog niet geïmplementeerd.');
}
